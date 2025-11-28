import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  dob?: Date;
  phoneNumber?: string;
  address?: string;
  isProfileComplete?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  toJSON(): Record<string, any>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    dob: { type: Date },
    phoneNumber: { type: String, trim: true },
    address: { type: String, trim: true },
    isProfileComplete: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// remove password when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
