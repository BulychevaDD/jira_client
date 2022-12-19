import axios from "axios";
import { isClientSide } from "../utils/common";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/storageKeys";
import getConfig from "next/config";
import Cookies from "js-cookie";

const getHeaders = () => {
  let accessToken;
  if (isClientSide()) {
    accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  }

  if (typeof accessToken === "string") {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
};

export const API = () => {
  const { publicRuntimeConfig } = getConfig();
  const { apiBaseUrl } = publicRuntimeConfig;

  const instance = axios.create({
    headers: getHeaders(),
    baseURL: apiBaseUrl,
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
      const originalRequest = error.config;

      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        return await axios
          .post(`${apiBaseUrl}/api/users/token/refresh`, {
            refresh: refreshToken,
          })
          .then((response) => {
            Cookies.set(ACCESS_TOKEN_KEY, response.data.access);
            Cookies.set(REFRESH_TOKEN_KEY, response.data.refresh);
            return instance(originalRequest);
          })
          .catch(() => {
            Cookies.remove(ACCESS_TOKEN_KEY);
            Cookies.remove(REFRESH_TOKEN_KEY);
            return Promise.reject(error);
          });
      }
    }
  );

  return instance;
};
