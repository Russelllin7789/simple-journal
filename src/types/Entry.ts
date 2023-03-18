import type Emoji from "./Emoji";

export default interface Entry {
  body: string;
  emoji: Emoji | null;
  userId: number;
  id: number;
  createdAt: Date;
}
