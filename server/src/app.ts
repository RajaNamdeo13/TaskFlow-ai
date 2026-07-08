import express from "express";
import cors from "cors";
import helmet from "helmet";
import { clientOrigins } from "./config/env.ts";
import { blueprintRouter } from "./routes/blueprintRoutes.ts";
import { healthRouter } from "./routes/healthRoutes.ts";
import { notFound } from "./middleware/notFound.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: clientOrigins, credentials: true }));
  app.use(express.json({ limit: "1mb" }));

  app.use("/api/health", healthRouter);
  app.use("/api/blueprints", blueprintRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
