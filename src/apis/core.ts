import axios from "axios";
import { TOKEN_KEY } from "../Constants/constants";

export const baseUrl = process.env.REACT_APP_API_BASE_URL || "";

const token = localStorage.getItem(TOKEN_KEY) || "";

export async function getApi(
  url: string,
  withAuth: boolean = true,
) {
  try {
    const result = await axios.get(baseUrl + url, {
      headers: withAuth
        ? {
          Authorization: `Bearer ${token}`,
        }
        : {},
    });
    return result.data.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return [];
  }
}
export async function postApi(
  url: string,
  body: any,
  withAuth: boolean = true,
) {
  try {
    const result = await axios.post(baseUrl + url, body, {
      headers: withAuth
        ? {
          Authorization: `Bearer ${token}`,
        }
        : {},
    });
    return result.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return null;
  }
}
