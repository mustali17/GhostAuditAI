import { Queue } from 'bullmq';
import redis from '../config/redis';

export const auditQueue = new Queue('audit', {
  connection: redis as any,
});

export const addAuditJob = async (data: {
  userId: string;
  fileId: string;
  accessToken: string;
  organizationId?: string;
}) => {
  return await auditQueue.add('audit-file', data);
};
