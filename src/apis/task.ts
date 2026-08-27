
import { TaskItem } from "../types/TaskItem";
import { useApi } from "./core";

export const useTaskApi = () => {
  const api = useApi();

  const getActiveItems = async () => {
    const url = "tasks?isDone=false";
    return api.getApi(url);
  };
  const getDoneItems = async () => {
    const url = "tasks?isDone=true";
    return api.getApi(url);
  };
  const toggleTaskApi = async (selectId: string): Promise<TaskItem> => {
    const url = "task/" + selectId + "/toggleDone";
    return api.getApi(url);
  }
  const addTask = async (
    categoryId: number,
    title: string,
    authorId: number,
  ): Promise<TaskItem | null> => {
    const url = "task";
    const body = { categoryId: categoryId, title: title, authorId: authorId };
    const result = await api.postApi(url, body);
    return result.data;
  }
  return { getActiveItems, getDoneItems, toggleTaskApi, addTask }
};
