import mongoose, { Document, Schema } from "mongoose";
export interface ICycle extends Document {
  userId: mongoose.Types.ObjectId;
  lastPeriodDate: Date;
  cycleLength: Date;
  periodDuration?: string[];
  flowIntensity?: string;
  createdAt?: Date;
  updatedAt?: Date;
  toJSON(): Record<string, any>;
}

const cycleSchema: Schema<ICycle> = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lastPeriodDate: { type: Date, required: true },
    cycleLength: { type: Date, required: true },
    periodDuration: { type: [String] },
    flowIntensity: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// remove __v when converting to JSON
cycleSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
}

const CycleInfo = mongoose.model<ICycle>("CycleInfo", cycleSchema);
export default CycleInfo;