import axios from "axios";
import { Authors } from "../types/Authors";
import { baseUrl } from "./core";

export const getAuthorsItems = async () => {
  try {
    const result = await axios.get(baseUrl + "authors");
    const authorsItems: Authors[] | undefined = result.data.data;
    return authorsItems;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
  }
};
