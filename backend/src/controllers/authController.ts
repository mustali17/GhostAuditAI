import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import User from "../models/User";
import Organization from "../models/Organization";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/google/callback",
);

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, organizationName } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    if (organizationName) {
      const organization = await Organization.create({
        name: organizationName,
        ownerId: user._id,
        members: [user._id],
      });

      user.organizationId = organization._id as any;
      await user.save();
    }

    const token = generateToken(user._id as unknown as string);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      organizationId: user.organizationId,
      // token is no longer sent in the body
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const token = generateToken(user._id as unknown as string);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        organizationId: user.organizationId,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // expire immediately
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      organizationId: user.organizationId,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const getGoogleAuthUrl = (req: Request, res: Response) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
    state: "login",
  });

  res.json({ url });
};

export const googleLoginCallback = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email) {
      return res
        .status(400)
        .json({ message: "Google account does not have an email." });
    }

    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = await User.create({
        name: data.name || "Google User",
        email: data.email,
        passwordHash: "",
      });

      const organization = await Organization.create({
        name: `${user.name}'s Workspace`,
        ownerId: user._id,
        members: [user._id],
      });

      user.organizationId = organization._id as any;
      await user.save();
    }

    const token = generateToken(user._id as unknown as string);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      organizationId: user.organizationId,
    });
  } catch (error: any) {
    console.error("Error in google login:", error);
    res.status(500).json({ message: "Failed to authenticate with Google" });
  }
};
