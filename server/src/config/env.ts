import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173,http://127.0.0.1:5173,http://127.0.0.1:5174"),
  GEMINI_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export const isProduction = env.NODE_ENV === "production";

export const clientOrigins = env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean);
