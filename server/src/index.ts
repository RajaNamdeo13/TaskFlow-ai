import { createApp } from "./app.ts";
import { env } from "./config/env.ts";
import { prisma } from "./db/prisma.ts";
const app = createApp();
const server = app.listen(env.PORT, () => console.log(`TaskFlow AI API listening on port ${env.PORT}`));
async function shutdown(signal: string) { console.log(`${signal}: closing server`); server.close(async () => { await prisma.$disconnect(); process.exit(0); }); }
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
