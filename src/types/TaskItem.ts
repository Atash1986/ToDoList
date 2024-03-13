export type TaskItem = {
  id: string;
  title: string;
  isDone: boolean;
  author: { id: number; name: string; fullName: string };
  creationDate: number;
  categoryItem: { id: number; color: string };
};
