import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
