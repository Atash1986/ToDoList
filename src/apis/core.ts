import axios, { AxiosError } from "axios";
import { TOKEN_KEY } from "../Constants/constants";
import { useNavigate } from "react-router-dom";

export const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
export const useApi = () => {

  const token = localStorage.getItem(TOKEN_KEY) || "";
  const navigate = useNavigate();

  const getApi = async (
    url: string,
    withAuth: boolean = true,
  ) => {
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
      const typedError = error as AxiosError;
      if (typedError.response?.status) {
        localStorage.clear();
        navigate("/login");
      }
      return [];
    }
  }

  const postApi = async (
    url: string,
    body: any,
    withAuth: boolean = true,
  ) => {
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
      const typedError = error as AxiosError;
      if (typedError.response?.status) {
        localStorage.clear();
        navigate("/login");
      }
      return null;
    }
  }

  return { getApi, postApi }
}
