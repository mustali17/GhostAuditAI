import mongoose, { Document, Schema } from 'mongoose';
import { UserTier } from './UserTier';

export interface IOrganization extends Document {
  name: string;
  tier: UserTier;
  ownerId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const OrganizationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tier: {
      type: String,
      enum: Object.values(UserTier),
      default: UserTier.FREE,
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
