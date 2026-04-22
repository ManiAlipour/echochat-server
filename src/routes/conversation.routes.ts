import { Router } from "express";
import { createPvConversation } from "../controllers/conversation.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-pv", authMiddleware, createPvConversation);

export default router;
