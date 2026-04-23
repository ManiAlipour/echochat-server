export interface MessageDTO {
  _id: string;
  conversation: string;

  text: string;

  sender: {
    _id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    avatar?: string;
  };

  seenStatus: "pv" | "group" | "channel";
  isSeen?: boolean;
  seenCount?: number;

  createdAt: string;
  updatedAt: string;
}
