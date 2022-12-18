import axios from "axios";
import { isClientSide } from "../utils/common";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
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

  return axios.create({
    headers: getHeaders(),
    baseURL: apiBaseUrl,
  });
};
