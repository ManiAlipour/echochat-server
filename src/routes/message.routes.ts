import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  sendMessage,
  getMessages,
  seenMessage,
  deleteMessage,
} from "../controllers/message.controller";

const router = Router();

router.post("/:conversationId/send", authMiddleware, sendMessage);

router.get("/:conversationId", authMiddleware, getMessages);

router.post("/:messageId/seen", authMiddleware, seenMessage);

router.delete("/:messageId", authMiddleware, deleteMessage);

export default router;
