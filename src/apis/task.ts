import axios from "axios";
import { baseUrl } from "./core";

export const getActiveItems = async () => {
  const result = await axios.get(baseUrl + "tasks?isDone=false");
  return result.data;
};
export const getDoneItems = async () => {
  const result = await axios.get(baseUrl + "tasks?isDone=true");
  return result.data;
};
export const getToggleTask = async (selectId: string) => {
  try {
    const url = baseUrl + "task/" + selectId + "/toggleDone";
    const result = await axios.get(url);

    return result.data.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return [];
  }
};
