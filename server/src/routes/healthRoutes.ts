import { Router } from "express";
import { prisma } from "../db/prisma.ts";

export const healthRouter = Router();
healthRouter.get("/", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "connected", service: "taskflow-ai-api", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Database health check failed", error);
    res.status(503).json({ status: "degraded", database: "unavailable", service: "taskflow-ai-api", timestamp: new Date().toISOString() });
  }
});
