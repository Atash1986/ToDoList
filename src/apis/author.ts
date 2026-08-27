import { Authors } from "../types/Authors";
import { useApi } from "./core";

export const useAuthorApi = () => {
  const api = useApi();
  const getAuthorsItems = async () => {
    const url = "authors";
    const result = await api.getApi(url);

    const authorsItems: Authors[] | undefined = result;
    return authorsItems;
  }
  return { getAuthorsItems };
};
