import type { RequestHandler } from "express";
import { HttpError } from "../utils/httpError.ts";

export const notFound: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, `Route ${req.method} ${req.path} not found`));
};
