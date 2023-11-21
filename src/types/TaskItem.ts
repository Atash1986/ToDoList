import { DateTime } from "./DateTime";

export type TaskItem = {
  id: number;
  title: string;
  isDone: boolean;
  authorId: number;
  dateAndTime: DateTime;
  categoryId: number;
};
