import Joi from "joi";

export const cycleSchema = Joi.object({
  userId: Joi.string()
    .required()
    .label("User ID")
    .messages({
      "any.required": "User ID is required",
      "string.empty": "User ID cannot be empty",
    }),

  lastPeriodDate: Joi.date()
    .required()
    .label("Last Period Date")
    .messages({
      "any.required": "Last Period Date is required",
      "date.base": "Last Period Date must be a valid date",
    }),

  cycleLength: Joi.number()
    .integer()
    .min(10)
    .max(45)
    .required()
    .label("Cycle Length (days)")
    .messages({
      "any.required": "Cycle length is required",
      "number.base": "Cycle length must be a number",
      "number.min": "Cycle length cannot be less than 10 days",
      "number.max": "Cycle length cannot be more than 45 days",
    }),

  periodDuration: Joi.array()
    .items(Joi.string())
    .optional()
    .label("Period Duration"),

  flowIntensity: Joi.string()
    .valid("light", "medium", "heavy")
    .optional()
    .label("Flow Intensity")
    .messages({
      "any.only": "Flow intensity must be one of: light, medium, heavy",
    }),
});
