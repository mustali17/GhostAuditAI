import express from "express";
import {
  getAuthUrl,
  exchangeCode,
  listFiles,
  setWatchFolder,
  syncFiles,
  disconnectDrive,
} from "../controllers/googleController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/auth-url", protect, getAuthUrl);
router.post("/exchange", protect, exchangeCode);
router.get("/files", protect, listFiles);
router.post("/watchfolder", protect, setWatchFolder);
router.post("/sync", protect, syncFiles);
router.post("/disconnect", protect, disconnectDrive);

export default router;
