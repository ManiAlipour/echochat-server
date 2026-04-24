import { Server } from "socket.io";
import {
  AuthedSocket,
  ClientToServerEvents,
  ServerToClientEvents,
} from "./types";

export const createSocketServer = (httpServer: any) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(
    httpServer,
    {
      cors: { origin: "*" },
    },
  );

  io.on("connection", (socket: AuthedSocket) => {
    console.log("New socket connected:", socket.id);
  });

  return io;
};
