import { Authors } from "../types/Authors";
import { getApi } from "./core";

export const getAuthorsItems = async () => {
  const url = "authors";
  const result = await getApi(url);

  const authorsItems: Authors[] | undefined = result;
  return authorsItems;
};
