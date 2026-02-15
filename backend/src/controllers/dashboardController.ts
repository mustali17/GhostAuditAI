import { Request, Response } from 'express';
import AuditResult from '../models/AuditResult';

import redis from '../config/redis';

export const getStats = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const cacheKey = `dashboard:stats:${userId}`;

  try {
     // Check Cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
        return res.json(JSON.parse(cachedData));
    }

    const totalFiles = await AuditResult.countDocuments({ userId });
    
    // Average AI Score
    const aiScoreAgg = await AuditResult.aggregate([
      { $match: { userId } },
      { $group: { _id: null, avgScore: { $avg: '$aiScore' } } },
    ]);
    const avgAiScore = aiScoreAgg[0]?.avgScore || 0;

    // Clean Docs (AI Score < 20)
    const cleanDocs = await AuditResult.countDocuments({ userId, aiScore: { $lt: 20 } });

    const stats = {
      totalFiles,
      avgAiScore: Math.round(avgAiScore),
      cleanDocs,
    };

    // Set Cache (Expire in 60s)
    await redis.setex(cacheKey, 60, JSON.stringify(stats));

    res.json(stats);
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

export const getRecentAudits = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const audits = await AuditResult.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(audits);
  } catch (error: any) {
    console.error('Error fetching recent audits:', error);
    res.status(500).json({ message: 'Failed to fetch recent audits' });
  }
};

export const getAllAudits = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const total = await AuditResult.countDocuments({ userId });
    const audits = await AuditResult.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
        audits,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    console.error('Error fetching all audits:', error);
    res.status(500).json({ message: 'Failed to fetch audits' });
  }
};
