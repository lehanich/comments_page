export type Comments = { [key: string]: Comment };

type Key = keyof Comments;

export interface Comment {
  text: string;
  date: number;
  author: string;
  answers?: string;
  comments?: Comments;
  likes: string[];
}
