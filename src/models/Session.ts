import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true }, // JWT
    device: { type: String, default: "unknown" },
    ip: { type: String, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Session", SessionSchema);
