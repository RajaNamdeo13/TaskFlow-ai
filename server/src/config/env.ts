import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173,http://127.0.0.1:5173"),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-3.8-flash"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required for PostgreSQL"),
  JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must contain at least 32 characters"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must contain at least 32 characters"),
});
export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";
export const clientOrigins = env.CLIENT_ORIGIN.split(",").map(origin => origin.trim()).filter(Boolean);
export const cookieOptions = { httpOnly: true, secure: isProduction, sameSite: "lax" as const, path: "/" };
