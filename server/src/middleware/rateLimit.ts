import type { RequestHandler } from "express";

type Counter = { count: number; resetAt: number };

export function rateLimit(options: { windowMs: number; limit: number; name: string }): RequestHandler {
  const counters = new Map<string, Counter>();
  return (req, res, next) => {
    const forwarded = req.get("x-forwarded-for")?.split(",")[0]?.trim();
    const key = `${options.name}:${forwarded || req.ip || "unknown"}`;
    const now = Date.now();
    const current = counters.get(key);
    const counter = !current || current.resetAt <= now ? { count: 0, resetAt: now + options.windowMs } : current;
    counter.count += 1;
    counters.set(key, counter);
    if (counters.size > 10_000) for (const [storedKey, stored] of counters) if (stored.resetAt <= now) counters.delete(storedKey);
    res.setHeader("RateLimit-Limit", options.limit);
    res.setHeader("RateLimit-Remaining", Math.max(0, options.limit - counter.count));
    res.setHeader("RateLimit-Reset", Math.ceil(counter.resetAt / 1000));
    if (counter.count > options.limit) {
      res.status(429).json({ error: { message: "Too many requests. Please try again shortly." } });
      return;
    }
    next();
  };
}
