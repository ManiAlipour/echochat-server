import { MessageDTO } from "../../dto/message.dto";

export const mapMessageToDTO = (m: any): MessageDTO => {
  return {
    _id: m._id.toString(),
    conversation: m.conversation.toString(),

    text: m.text,

    sender: {
      _id: m.sender._id.toString(),
      firstName: m.sender.firstName,
      lastName: m.sender.lastName,
      username: m.sender.username,
      avatar: m.sender.avatar,
    },

    seenStatus: m.seenStatus,
    isSeen: m.seenStatus === "pv" ? m.isSeen : undefined,
    seenCount: m.seenStatus !== "pv" ? m.seenCount : undefined,

    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
  };
};
