import express from 'express';
import { getAudit, humanizeText } from '../controllers/auditController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:id', protect, getAudit);
router.post('/humanize', protect, humanizeText);
import { generateReport } from '../controllers/auditController';
router.get('/:id/pdf', protect, generateReport);

export default router;
