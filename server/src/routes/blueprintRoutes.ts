import { Router } from "express";
import { generateBlueprintController } from "../controllers/blueprintController.ts";

export const blueprintRouter = Router();

blueprintRouter.post("/generate", generateBlueprintController);
