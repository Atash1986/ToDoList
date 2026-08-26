import { useApi } from "./core";

export const useCategoryApi = () => {
  const api = useApi();
  const getCategories = async () => {
    const url = "categories";
    const result = api.getApi(url);
    return result;
  }
  return { getCategories }
};
