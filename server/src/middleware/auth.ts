import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.ts";
import { HttpError } from "../utils/httpError.ts";

type Claims = { sub: string; workspaceId: string; role: "USER" | "ADMIN" };

export const requireAuth: RequestHandler = (req, _res, next) => {
  const cookieToken = req.cookies?.taskflow_access as string | undefined;
  const header = req.header("authorization");
  const token = cookieToken ?? (header?.startsWith("Bearer ") ? header.slice(7) : undefined);
  if (!token) return next(new HttpError(401, "Authentication required."));
  try {
    const claims = jwt.verify(token, env.JWT_ACCESS_SECRET) as Claims;
    if (!claims.sub || !claims.workspaceId) return next(new HttpError(401, "Invalid access token."));
    req.auth = { userId: claims.sub, workspaceId: claims.workspaceId, role: claims.role };
    next();
  } catch { next(new HttpError(401, "Your session has expired. Please sign in again.")); }
};
