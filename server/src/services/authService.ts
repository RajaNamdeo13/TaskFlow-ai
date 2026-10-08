import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import type { User, UserRole } from "@prisma/client";
import { env } from "../config/env.ts";
import { prisma } from "../db/prisma.ts";

const ACCESS_TTL = "15m";
const REFRESH_DAYS = 7;

export function publicUser(user: Pick<User, "id" | "email" | "name" | "role" | "createdAt">) {
  return { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt };
}

export function signAccessToken(userId: string, workspaceId: string, role: UserRole) {
  return jwt.sign({ sub: userId, workspaceId, role }, env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

export async function createRefreshToken(userId: string) {
  const raw = crypto.randomBytes(48).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  await prisma.refreshToken.create({ data: { tokenHash, userId, expiresAt: new Date(Date.now() + REFRESH_DAYS * 86400000) } });
  return raw;
}

export async function revokeRefreshToken(raw: string | undefined) {
  if (!raw) return;
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  await prisma.refreshToken.updateMany({ where: { tokenHash, revokedAt: null }, data: { revokedAt: new Date() } });
}

export async function rotateRefreshToken(raw: string) {
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const stored = await prisma.refreshToken.findFirst({ where: { tokenHash, revokedAt: null, expiresAt: { gt: new Date() } }, include: { user: { include: { workspaces: { take: 1 } } } } });
  if (!stored || !stored.user.workspaces[0]) return null;
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const next = await createRefreshToken(stored.userId);
  return { user: stored.user, workspaceId: stored.user.workspaces[0].id, refreshToken: next, accessToken: signAccessToken(stored.userId, stored.user.workspaces[0].id, stored.user.role) };
}
