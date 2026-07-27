import { postApi } from "./core";
import { LoginResponse } from "../types/LoginResponse";

export const login = async (userName: string, password: string) => {
  const url = "login";
  const body = { userName, password };
  const result = await postApi(url, body, false);
  console.log("login result:", result);

  const loginResponse: LoginResponse | undefined = result;

  return loginResponse?.data;
};
