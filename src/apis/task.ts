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
export const addTask = async (newTask: any): Promise<TaskItem | null> => {
  const url = "task";
  return postApi(url, newTask);
};
