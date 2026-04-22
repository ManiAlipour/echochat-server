import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Session from "../models/Session";

export async function register(req: Request, res: Response) {
  try {
    const { firstName, lastName = "", email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
    );

    await Session.create({
      user: user._id,
      token,
      ip: req.ip,
      device: String(req.headers["user-agent"]),
    });

    res.status(201).json({ data: user, token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
    );

    await Session.create({
      user: user._id,
      token,
      ip: req.ip,
      device: String(req.headers["user-agent"]),
    });

    const safeUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      data: safeUser,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function me(req: Request, res: Response) {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }

    res.json({ data: user });
  } catch (error) {
    console.error("getMe error: ", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const sessionId = req.sessionId;

    await Session.findByIdAndDelete(sessionId);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("logout error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
