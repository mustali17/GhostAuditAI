import express from 'express';
import { getStats, getRecentAudits, getAllAudits } from '../controllers/dashboardController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/stats', protect, getStats);
router.get('/recent', protect, getRecentAudits);
router.get('/audits', protect, getAllAudits);

export default router;
