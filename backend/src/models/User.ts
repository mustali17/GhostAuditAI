import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  organizationId?: mongoose.Types.ObjectId;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: "active" | "past_due" | "canceled" | "incomplete";
  tier: string; // 'FREE' | 'GROWTH' | 'AGENCY'
  googleAccessToken?: string;
  googleRefreshToken?: string;
  watchFolderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false },
    name: { type: String, required: true },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    stripeCustomerId: { type: String },
    subscriptionId: { type: String },
    subscriptionStatus: {
      type: String,
      enum: ["active", "past_due", "canceled", "incomplete"],
    },
    tier: { type: String, default: "FREE" },
    googleAccessToken: { type: String },
    googleRefreshToken: { type: String },
    watchFolderId: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
