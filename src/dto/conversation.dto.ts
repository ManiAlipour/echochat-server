import { MessageDTO } from "./message.dto";

export interface ConversationDTO {
  _id: string;

  type: "pv" | "group" | "channel";

  title?: string;
  avatar?: string;

  participants: Array<{
    _id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    avatar?: string;
  }>;

  admins?: string[];

  lastMessage?: MessageDTO;

  lastMessageAt?: string;
}
