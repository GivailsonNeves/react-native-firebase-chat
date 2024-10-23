export type Message = {
  id: string;
  text: string;
  createdAt: Date;
  isSender: boolean;
  liked: boolean;
  photoUrl?: string;
};
