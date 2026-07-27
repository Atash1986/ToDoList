
import { getApi } from "./core";

export const getCategories = async () => {
  const url = "categories";
    const result = getApi(url);
    return result;
  
};
