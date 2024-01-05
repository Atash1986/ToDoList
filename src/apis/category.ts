import axios from "axios";
import { baseUrl } from "./core";

export const getCategory = async () => {
  try {
    const result = await axios.get(baseUrl + "categories");
    return result.data.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return [];
  }
};
