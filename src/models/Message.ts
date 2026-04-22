import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      trim: true,
      default: "",
    },

    seenStatus: {
      type: String,
      enum: ["pv", "group", "channel"],
      required: true,
    },

    isSeen: {
      type: Boolean,
      default: false,
    },

    seenCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default model("Message", MessageSchema);
