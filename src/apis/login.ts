import axios from "axios";
import { baseUrl } from "./core";
import {LoginResponse} from "../types/LoginResponse";


export const login = async (
  userName: string,
  password: string
) => {
  try {
    const result = await axios.post(baseUrl + "login", {
      userName,
      password,
    });


    console.log("Login result:", result.data);
    const loginResponse:LoginResponse | undefined = result.data;
  
    return loginResponse?.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return null;
  }
};