import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

type validationTarget = "body" | "params" | "query";

export const validateSchema = <T>(
  schema: ZodSchema<T>,
  validationTarget: validationTarget
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req[validationTarget];
      await schema.parseAsync(body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          type: "validation_error",
          error: error.errors,
        });
      }
      console.log(error);
      res.status(500).json({
        status: "error",
        type: "internal_server_error",
        error: "Internal Server Error",
      });
    }
  };
};
