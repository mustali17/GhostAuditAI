import { Worker, Job } from 'bullmq';
import { downloadFile, getFileMetadata } from '../services/fileService';
import { extractText } from '../services/textService';
import { analyzeText } from '../services/auditService';
import AuditResult from '../models/AuditResult';
import redis from '../config/redis';

const worker = new Worker(
  'audit',
  async (job: Job) => {
    const { userId, fileId } = job.data;
    // We fetch user here to ensure we have fresh tokens
    const User = require('../models/User').default;
    const user = await User.findById(userId);

    if (!user || !user.googleAccessToken) {
        throw new Error(`User ${userId} or Google Tokens not found`);
    }

    try {
      console.log(`Processing file ${fileId} for user ${userId}`);

      const { googleAccessToken, googleRefreshToken } = user;

      // 1. Download File
      const fileBuffer = await downloadFile(fileId, googleAccessToken, googleRefreshToken);
      
      // 2. Get Metadata for MIME Type
      const metadata = await getFileMetadata(fileId, googleAccessToken, googleRefreshToken);
      const mimeType = metadata.mimeType || '';

      // 3. Extract Text
      const text = await extractText(fileBuffer, mimeType);

      // 4. Run Audit
      const analysis = await analyzeText(text);

      // 5. Update AuditResult
      await AuditResult.findOneAndUpdate(
        { fileId, userId },
        {
          aiScore: analysis.aiScore,
          plagiarismScore: analysis.plagiarismScore,
          flaggedSentences: analysis.flaggedSentences,
          status: 'COMPLETED',
        },
        { upsert: true, new: true } // Upsert in case it wasn't created before
      );

      console.log(`Audit completed for file ${fileId}`);
      
      // Invalidate Dashboard Cache
      const cacheKey = `dashboard:stats:${userId}`;
      await redis.del(cacheKey);

    } catch (error: any) {
      console.error(`Audit failed for file ${fileId}:`, error);
      await AuditResult.findOneAndUpdate(
        { fileId, userId },
        { status: 'FAILED' }
      );
    }
  },
  {
    connection: redis as any,
  }
);

export default worker;
