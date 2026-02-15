import express from 'express';
import { getAuthUrl, exchangeCode, listFiles, setWatchFolder, syncFiles } from '../controllers/googleController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/auth-url', protect, getAuthUrl);
router.post('/exchange', protect, exchangeCode);
router.get('/files', protect, listFiles);
router.post('/watchfolder', protect, setWatchFolder);
router.post('/sync', protect, syncFiles);

export default router;
