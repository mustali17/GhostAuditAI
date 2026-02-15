import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditResult extends Document {
  userId: mongoose.Types.ObjectId;
  organizationId?: mongoose.Types.ObjectId;
  fileId: string;
  fileName: string;
  aiScore: number; // 0-100 (Probability of AI)
  plagiarismScore: number; // 0-100
  flaggedSentences: {
    text: string;
    issueType: 'AI' | 'PLAGIARISM' | 'FACT_CHECK';
    suggestion?: string;
  }[];
  humanizedText?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
}

const AuditResultSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    fileId: { type: String, required: true },
    fileName: { type: String, required: true },
    aiScore: { type: Number, default: 0 },
    plagiarismScore: { type: Number, default: 0 },
    flaggedSentences: [
      {
        text: { type: String },
        issueType: { type: String, enum: ['AI', 'PLAGIARISM', 'FACT_CHECK'] },
        suggestion: { type: String },
      },
    ],
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  },
  { timestamps: true }
);

export default mongoose.model<IAuditResult>('AuditResult', AuditResultSchema);
