import { Socket } from "socket.io";

export interface AuthedSocket extends Socket {
  userId?: string;
  sessionId?: string;
}

/* -------------- Client → Server events -------------- */
export interface ClientToServerEvents {
  "conversation:create:pv": (
    payload: { targetUserId: string },
    callback?: (data: {
      success: boolean;
      error?: string;
      conversation?: any;
    }) => void,
  ) => void;
}

/* -------------- Server → Client events -------------- */
export interface ServerToClientEvents {
  "conversation:new": (conversation: any) => void;
}
