import { describe, expect, it } from "vitest";
import { createDemoBlueprint } from "./demoBlueprint.ts";
import { detectDomain, extractRequirements, retrieveKnowledge } from "./domainKnowledge.ts";
import { personalizeDemo, validateBlueprint } from "./blueprintQuality.ts";

describe("domain-aware blueprint generation", () => {
  it("detects concrete product domains instead of using one generic category", () => {
    expect(detectDomain("A clinic appointment scheduler for doctors").key).toBe("healthcare");
    expect(detectDomain("A warehouse delivery dispatch console").key).toBe("logistics");
    expect(detectDomain("An invoice reconciliation and payment ledger").key).toBe("finance");
  });

  it("extracts requirements and knowledge notes from the idea", () => {
    const domain = detectDomain("A live student learning app with reminders and analytics");
    const requirements = extractRequirements("A live student learning app with reminders and analytics", domain);
    expect(domain.key).toBe("education");
    expect(requirements.realtime).toBe("yes");
    expect(requirements.features).toEqual(expect.arrayContaining(["notifications", "reporting"]));
    expect(retrieveKnowledge(domain)).toHaveLength(3);
  });

  it("personalizes fallback names, routes, tables, and trace warnings", () => {
    const domain = detectDomain("A marketplace for independent makers");
    const blueprint = personalizeDemo(createDemoBlueprint("A marketplace for independent makers"), "A marketplace for independent makers", domain);
    expect(blueprint.projectName).toContain("PurchaseJourney");
    expect(blueprint.apiDesign[0]?.path).toBe("/api/catalog");
    expect(blueprint.databaseSchema[0]?.tableName).toBe("catalog_items");
    expect(validateBlueprint(blueprint)).toEqual([]);
  });
});
