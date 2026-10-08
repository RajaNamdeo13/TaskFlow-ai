import "dotenv/config";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const shouldRunGeminiTest = process.env.RUN_GEMINI_TEST === "true";

describe("Gemini configuration", () => {
  it.skipIf(!shouldRunGeminiTest)(
    "accepts the configured Gemini key with a lightweight models request",
    async () => {
      const key = process.env.GEMINI_API_KEY;

      expect(
        key,
        "GEMINI_API_KEY must be configured for the live Gemini test",
      ).toBeTruthy();

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
          key ?? "",
         )}`,
      );

      expect(response.ok).toBe(true);
    },
    20_000,
  );

  it("keeps Gemini configuration out of browser source and example values", () => {
    const apiClient = readFileSync(
      resolve(process.cwd(), "src/services/api.ts"),
      "utf8",
    );

    expect(apiClient).not.toContain("GEMINI_API_KEY");

    const envExamplePath = resolve(process.cwd(), ".env.example");

    if (existsSync(envExamplePath)) {
      const envExample = readFileSync(envExamplePath, "utf8");

      expect(envExample).not.toMatch(/AQ\\.[A-Za-z0-9_-]+/);
    }
  });
});
