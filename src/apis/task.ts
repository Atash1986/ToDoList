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
