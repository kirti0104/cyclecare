import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

// This is a reusable middleware factory function.
// It takes a Joi schema and returns a middleware that validates the request body.
export const validate = (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false, // Return all errors instead of the first one
    allowUnknown: true, // Allow unknown keys that are ignored
    stripUnknown: true // Remove unknown keys from the validated data
  });

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      message: detail.message,
      path: detail.path
    }));

    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorDetails
    });
    return; 
  }

  // If validation passes, attach the validated data to the request body and move to the next middleware.
  req.body = schema.validate(req.body).value;
  next();
};
