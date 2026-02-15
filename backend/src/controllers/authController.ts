import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Organization from '../models/Organization';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, organizationName } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
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

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      organizationId: user.organizationId,
      token: generateToken(user._id as unknown as string),
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
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        organizationId: user.organizationId,
        token: generateToken(user._id as unknown as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
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
    res.status(404).json({ message: 'User not found' });
  }
};
