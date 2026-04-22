import { Response } from "express";
import Conversation from "../models/Conversation";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";

export async function createPvConversation(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    const { targetUserId } = req.body;

    if (!mongoose.isValidObjectId(targetUserId))
      return res.status(400).json({ message: "Invalid target user ID" });

    if (userId === targetUserId)
      return res
        .status(400)
        .json({ message: "Cannot create PV with yourself" });

    const pvKey = [userId, targetUserId].sort().join("_");

    let conversation = await Conversation.findOne({ pvKey });

    if (conversation)
      return res
        .status(200)
        .json({ conversation, message: "PV already exists" });

    conversation = await Conversation.create({
      type: "pv",
      participants: [userId, targetUserId],
      pvKey,
    });

    res.status(201).json({ data: conversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
