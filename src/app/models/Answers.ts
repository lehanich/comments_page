
export type Answers = { [key: string]: Answer };

type Key = keyof Answers;

export interface Answer {
  text: string;
  date: Date;
  author: string;
  answers: Answers;
}
