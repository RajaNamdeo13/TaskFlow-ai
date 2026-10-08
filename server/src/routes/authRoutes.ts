import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../db/prisma.ts";
import { cookieOptions } from "../config/env.ts";
import { createRefreshToken, publicUser, revokeRefreshToken, rotateRefreshToken, signAccessToken } from "../services/authService.ts";
import { requireAuth } from "../middleware/auth.ts";
import { HttpError } from "../utils/httpError.ts";

const router = Router();
const credentials = z.object({ email: z.string().trim().email().transform(value => value.toLowerCase()), password: z.string().min(8).max(128) });
const registration = credentials.extend({ name: z.string().trim().min(2).max(80) });
const setSession = (res: Parameters<typeof router.post>[1] extends never ? never : any, userId: string, workspaceId: string, role: "USER" | "ADMIN", refreshToken: string) => { res.cookie("taskflow_access", signAccessToken(userId, workspaceId, role), { ...cookieOptions, maxAge: 15 * 60 * 1000 }); res.cookie("taskflow_refresh", refreshToken, { ...cookieOptions, maxAge: 7 * 86400000 }); };

router.post("/register", async (req, res) => { const input = registration.parse(req.body); const exists = await prisma.user.findUnique({ where: { email: input.email } }); if (exists) throw new HttpError(409, "An account with this email already exists."); const passwordHash = await bcrypt.hash(input.password, 12); const created = await prisma.$transaction(async tx => { const user = await tx.user.create({ data: { email: input.email, name: input.name, passwordHash } }); const workspace = await tx.workspace.create({ data: { name: `${input.name}'s workspace`, ownerId: user.id } }); return { user, workspace }; }); const refresh = await createRefreshToken(created.user.id); setSession(res, created.user.id, created.workspace.id, created.user.role, refresh); res.status(201).json({ user: publicUser(created.user), workspace: created.workspace }); });
router.post("/login", async (req, res) => { const input = credentials.parse(req.body); const user = await prisma.user.findUnique({ where: { email: input.email }, include: { workspaces: { take: 1 } } }); if (!user || !(await bcrypt.compare(input.password, user.passwordHash)) || !user.workspaces[0]) throw new HttpError(401, "Email or password is incorrect."); const refresh = await createRefreshToken(user.id); setSession(res, user.id, user.workspaces[0].id, user.role, refresh); res.json({ user: publicUser(user), workspace: user.workspaces[0] }); });
router.post("/refresh", async (req, res) => { const rotated = await rotateRefreshToken(req.cookies?.taskflow_refresh); if (!rotated) throw new HttpError(401, "Refresh session is invalid or expired."); setSession(res, rotated.user.id, rotated.workspaceId, rotated.user.role, rotated.refreshToken); res.json({ user: publicUser(rotated.user), workspaceId: rotated.workspaceId }); });
router.get("/me", requireAuth, async (req, res) => { const user = await prisma.user.findUnique({ where: { id: req.auth!.userId } }); if (!user) throw new HttpError(401, "User no longer exists."); res.json({ user: publicUser(user), workspaceId: req.auth!.workspaceId }); });
router.post("/logout", async (req, res) => { await revokeRefreshToken(req.cookies?.taskflow_refresh); res.clearCookie("taskflow_access", cookieOptions); res.clearCookie("taskflow_refresh", cookieOptions); res.status(204).end(); });
export { router as authRouter };
