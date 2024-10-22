export type Message = {
  id: string;
  text: string;
  createdAt: Date;
  isSender: boolean;
  visualized: boolean;
  liked: boolean;
  photoUrl?: string;
};
