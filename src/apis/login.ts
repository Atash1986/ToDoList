
import { LoginResponse } from "../types/LoginResponse";
import { useApi } from "./core";

export const useLoginApi = () => {
  const api = useApi();
  const login = async (userName: string, password: string) => {
    const url = "login";
    const body = { userName, password };
    const result = await api.postApi(url, body, false);
    console.log("login result:", result);

    const loginResponse: LoginResponse | undefined = result;

    return loginResponse?.data;
  }
  return { login }
};
