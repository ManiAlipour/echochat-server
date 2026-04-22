import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["pv", "group", "channel"],
      default: "pv",
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    pvKey: {
      type: String,
      unique: true,
      sparse: true,
    },

    title: String,

    avatar: String,

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    lastMessageAt: Date,
  },
  { timestamps: true },
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });

export default mongoose.model("Conversation", conversationSchema);
