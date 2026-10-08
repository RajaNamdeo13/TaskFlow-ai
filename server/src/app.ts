import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { clientOrigins } from "./config/env.ts";
import { authRouter } from "./routes/authRoutes.ts";
import { blueprintRouter } from "./routes/blueprintRoutes.ts";
import { healthRouter } from "./routes/healthRoutes.ts";
import { notFound } from "./middleware/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { rateLimit } from "./middleware/rateLimit.ts";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: clientOrigins, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());
  app.use("/api/health", healthRouter);
  app.use("/api/auth", rateLimit({ name: "auth", windowMs: 15 * 60 * 1000, limit: 30 }), authRouter);
  app.use("/api/blueprints/generate", rateLimit({ name: "generation", windowMs: 60 * 60 * 1000, limit: 20 }));
  app.use("/api/blueprints", blueprintRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
