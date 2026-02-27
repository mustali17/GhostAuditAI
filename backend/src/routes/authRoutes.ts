import express from "express";
import {
  register,
  login,
  getMe,
  logout,
  getGoogleAuthUrl,
  googleLoginCallback,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.get("/google/url", getGoogleAuthUrl);
router.post("/google/callback", googleLoginCallback);

export default router;
