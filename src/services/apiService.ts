import axios from "axios";
import { isClientSide } from "../utils/common";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";

const getHeaders = () => {
  let accessToken;
  if (isClientSide()) {
    accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
};

export const API = axios.create({ headers: getHeaders() });
