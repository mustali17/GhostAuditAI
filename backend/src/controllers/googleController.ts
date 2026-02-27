import { google } from "googleapis";
import { Request, Response } from "express";
import User from "../models/User";
import { addAuditJob } from "../services/queueService";
import AuditResult from "../models/AuditResult";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/google/callback",
);

export const getAuthUrl = (req: Request, res: Response) => {
  const scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // crucial for refresh token
    scope: scopes,
    prompt: "consent", // force consent to ensure refresh token is returned
    state: "drive",
  });

  res.json({ url });
};

export const googleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;
  const { userId } = req.query; // Passed from frontend via state or handled via session if we had one.
  // Simplified approach: Frontend sends code + userId in a POST or we use state param in OAuth.

  // Correction: OAuth callback comes from Google directly to Backend. We need to know WHICH user this is.
  // Common pattern: Frontend handles the redirect, gets the code, and sends it to backend authenticated.

  // Let's implement the "Frontend sends code" pattern for better DX with JWT.
  // This function will be `exchangeCode`.
};

export const exchangeCode = async (req: Request, res: Response) => {
  const { code } = req.body;
  const userId = req.user?._id;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    await User.findByIdAndUpdate(userId, {
      googleAccessToken: tokens.access_token,
      googleRefreshToken: tokens.refresh_token,
    });

    res.json({ message: "Google Drive connected successfully" });
  } catch (error: any) {
    console.error("Error exchanging code:", error);
    res.status(500).json({ message: "Failed to connect Google Drive" });
  }
};

export const listFiles = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (!user || !user.googleAccessToken) {
    return res.status(401).json({ message: "Google Drive not connected" });
  }

  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  try {
    const response = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name, mimeType)",
      q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
    });

    res.json(response.data.files);
  } catch (error: any) {
    // If token expired, we might need to refresh directly or rely on googleapis to auto-refresh if refresh_token is set.
    // googleapis auto-refreshes if refresh_token is present.
    console.error("Error listing files:", error);
    res.status(500).json({ message: "Failed to list files" });
  }
};

export const setWatchFolder = async (req: Request, res: Response) => {
  const { folderId } = req.body;
  const userId = req.user?._id;

  if (!folderId) {
    return res.status(400).json({ message: "Folder ID is required" });
  }

  await User.findByIdAndUpdate(userId, { watchFolderId: folderId });
  res.json({ message: "Watchfolder updated" });
};

export const syncFiles = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user || !user.googleAccessToken || !user.watchFolderId) {
    return res
      .status(400)
      .json({ message: "Google Drive not connected or Watchfolder not set" });
  }

  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  try {
    const response = await drive.files.list({
      q: `'${user.watchFolderId}' in parents and (mimeType = 'application/pdf' or mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') and trashed = false`,
      fields: "files(id, name, mimeType)",
    });

    const files = response.data.files || [];
    let syncedCount = 0;

    for (const file of files) {
      if (!file.id || !file.name) continue;

      const existingAudit = await AuditResult.findOne({
        fileId: file.id,
        userId,
      });

      if (!existingAudit) {
        await AuditResult.create({
          userId,
          organizationId: user.organizationId,
          fileId: file.id,
          fileName: file.name,
          status: "PENDING",
        });

        await addAuditJob({
          userId: userId as unknown as string,
          fileId: file.id,
          accessToken: user.googleAccessToken,
          organizationId: user.organizationId?.toString(),
        });

        syncedCount++;
      }
    }

    res.json({
      message: `Synced ${syncedCount} new files`,
      totalFound: files.length,
    });
  } catch (error: any) {
    console.error("Error syncing files:", error);
    res.status(500).json({ message: "Failed to sync files" });
  }
};

export const disconnectDrive = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    await User.findByIdAndUpdate(userId, {
      $unset: {
        googleAccessToken: "",
        googleRefreshToken: "",
        watchFolderId: "",
      },
    });

    res.json({ message: "Google Drive disconnected successfully" });
  } catch (error: any) {
    console.error("Error disconnecting drive:", error);
    res.status(500).json({ message: "Failed to disconnect Google Drive" });
  }
};
