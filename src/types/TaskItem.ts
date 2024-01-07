import { DateTime } from "./DateTime";

export type TaskItem = {
  id: string;
  title: string;
  isDone: boolean;
  authorId: number;
  creationDate: number;
  categoryItem: { id: number; color: string };
};
