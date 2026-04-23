import { ConversationDTO } from "../../dto/conversation.dto";
import { mapMessageToDTO } from "./message.mapper";

export const mapConversationToDTO = (conv: any): ConversationDTO => {
  return {
    _id: conv._id.toString(),
    type: conv.type,

    title: conv.title,
    avatar: conv.avatar,

    participants: conv.participants.map((u: any) => ({
      _id: u._id.toString(),
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      avatar: u.avatar,
    })),

    admins: conv.admins?.map((a: any) => a.toString()),

    lastMessage: conv.lastMessage
      ? mapMessageToDTO(conv.lastMessage)
      : undefined,

    lastMessageAt: conv.lastMessageAt?.toISOString(),
  };
};
