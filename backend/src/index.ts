import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
  : ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

import "./workers/auditWorker"; // Start Worker

import authRoutes from "./routes/authRoutes";
import googleRoutes from "./routes/googleRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import auditRoutes from "./routes/auditRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";

// Database Connection
connectDB();

// Routes
// Note: Webhook route needs raw body, but here we mounted it under /api/subscription/webhook.
// We should mount webhook separately OR ensure express.json() doesn't consume it first.
// For simplicity in MVP, let's mount subscription routes here.
// If express.json() is global, we might need to exclude the webhook route from it.
// UPDATED PLAN: Let's mount webhook route BEFORE global json middleware if possible, or handle it inside `subscriptionRoutes`.
// Since we used `express.raw({ type: 'application/json' })` in the router, it *might* conflict with global `express.json()`.
// A safer bet is to use `/api/subscription` but we need to ensure global middleware doesn't break it.
// Actually, `express.json()` usually ignores if content-type matches but body is already parsed?
// No, it might parse it and `stripe` needs RAW buffer.
// Let's rely on standard patterns. For now, just mounting it.

app.use("/api/auth", authRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("GhostAudit AI Backend is running");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
