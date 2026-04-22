import { Response } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { AuthRequest } from "../middleware/auth.middleware";

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const conversationId = req.params.conversationId as string;
    const { text } = req.body;
    const userId = req.userId;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Message text is required." });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found." });
    }

    const seenStatus: "pv" | "group" | "channel" =
      conversation.type === "pv"
        ? "pv"
        : conversation.type === "group"
          ? "group"
          : "channel";

    const newMessage = await Message.create({
      conversation: conversationId,
      sender: userId,
      text,
      seenStatus,
      isSeen: false,
      seenCount: 0,
    });

    conversation.lastMessage = newMessage._id;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    return res.status(201).json({ message: newMessage });
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "firstName lastName username avatar")
      .sort({ createdAt: 1 });

    return res.json({ messages });
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const seenMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId).populate("conversation");

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    const type = message.seenStatus;

    if (type === "pv") {
      if (!message.isSeen) {
        message.isSeen = true;
        await message.save();
      }

      return res.json({
        success: true,
        isSeen: true,
      });
    }

    message.seenCount += 1;
    await message.save();

    return res.json({
      success: true,
      seenCount: message.seenCount,
    });
  } catch (err) {
    console.error("Seen Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params;
    const userId = req.userId;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found." });
    }

    if (String(message.sender) !== userId) {
      return res
        .status(403)
        .json({ message: "Not allowed to delete this message." });
    }

    await message.deleteOne();

    return res.json({ success: true });
  } catch (err) {
    console.error("Delete Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
