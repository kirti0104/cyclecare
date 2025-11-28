import * as Yup from "yup";

export const CycleInfoSchema = Yup.object().shape({
  lastPeriodDate: Yup.date()
    .required("Last period date is required")
    .typeError("Please select a valid date"),

  cycleLength: Yup.number()
    .required("Cycle length is required")
    .min(10, "Cycle length must be at least 10 days")
    .max(45, "Cycle length cannot exceed 45 days")
    .typeError("Cycle length must be a number"),

  periodDuration: Yup.array()
    .of(Yup.string())
    .optional(),

  flowIntensity: Yup.string()
    .oneOf(["light", "medium", "heavy"], "Select a valid flow intensity")
    .required("Flow intensity is required"),
});
