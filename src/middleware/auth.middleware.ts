import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Session from "../models/Session";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const session = await Session.findOne({ token });
    if (!session)
      return res.status(401).json({ message: "Session expired or logged out" });

    req.userId = decoded.userId;
    req.sessionId = session._id.toString();

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
