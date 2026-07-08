import type { RequestHandler } from "express";
import { z } from "zod";
import { generateBlueprint } from "../services/blueprintService.ts";

const generateBlueprintSchema = z.object({
  idea: z.string().trim().min(12, "Describe the product idea in at least 12 characters.").max(2000),
});

export const generateBlueprintController: RequestHandler = async (req, res, next) => {
  try {
    const payload = generateBlueprintSchema.parse(req.body);
    const result = await generateBlueprint(payload);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
