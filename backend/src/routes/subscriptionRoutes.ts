import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/subscriptionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-session', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
