import { Router } from "express";
import authRouter from "./auth.routes";
import conversationRouter from "./conversation.routes";
import messageRouter from "./message.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/conversations", conversationRouter);
router.use("/messages", messageRouter);

export default router;
