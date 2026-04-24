import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { connectDB } from "./config/db";
import { createSocketServer } from "./socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = createSocketServer(server);
export { io };

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
