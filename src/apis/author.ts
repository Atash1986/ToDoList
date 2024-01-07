import axios from "axios";
import { Authors } from "../types/Authors";
import { baseUrl } from "./core";

let authorsItems: Authors[] | undefined;
export const getAuthorsItems = async () => {
  try {
    const result = await axios.get(baseUrl + "authors");
    authorsItems = result.data.data;
    return authorsItems;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
  }
};
