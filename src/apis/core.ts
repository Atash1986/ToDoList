import axios from "axios";
import { TaskItem } from "../types/TaskItem";

export const baseUrl = process.env.REACT_APP_API_BASE_URL || "";

export async function getApi(url: string) {
  try {
    const result = await axios.get(baseUrl + url);
    return result.data.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return [];
  }
}
export async function postApi(
  url: string,
  body: any
): Promise<TaskItem | null> {
  try {
    const result = await axios.post(baseUrl + url, body);
    return result.data.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return null;
  }
}
