import { DateTime } from "./DateTime";

export type TaskItem = {
  id: number;
  title: string;
  isDone: boolean;
  authorId: number;
  creationDate: number;
  categoryItem: { id: number };
};
