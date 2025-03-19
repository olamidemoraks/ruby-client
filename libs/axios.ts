import axios from "axios";
import { getCookie } from "cookies-next";
import { COOKIE_KEYS } from "./data";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = getCookie(COOKIE_KEYS.TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";

  // Disable credentials to avoid CORS issues
  // TEMP: This should be removed in production
  config.withCredentials = false;

  return config;
});

export { axios as customAxios };
