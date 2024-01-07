import { getApi, postApi } from "./core";
import { TaskItem } from "../types/TaskItem";

export const getActiveItems = async () => {
  const url = "tasks?isDone=false";
  return getApi(url);
};
export const getDoneItems = async () => {
  const url = "tasks?isDone=true";
  return getApi(url);
};
export async function getToggleTask(selectId: string): Promise<TaskItem> {
  const url = "task/" + selectId + "/toggleDone";
  return getApi(url);
}
export const addTask = async (
  categoryId: number,
  title: string,
  authorId: number
): Promise<TaskItem | null> => {
  const url = "task";
  const body = { categoryId: categoryId, title: title, authorId: authorId };
  return postApi(url, body);
};
