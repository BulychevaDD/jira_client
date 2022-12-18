import { useQuery, UseQueryResult } from "react-query";
import { GET_USER_INFO_KEY } from "../constants/queryKeys";
import { API } from "../services/apiService";
import { Tokens, UserInfo } from "../types/user";
import { AxiosResponse } from "axios";
import { isClientSide } from "../utils/common";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/storageKeys";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useUser = (): UseQueryResult<UserInfo> => {
  const result = useQuery(
    GET_USER_INFO_KEY,
    () =>
      API()
        .get("/api/users/info")
        .then((response: AxiosResponse<UserInfo>) => response.data),
    {
      enabled:
        isClientSide() && Boolean(Cookies.get(ACCESS_TOKEN_KEY)),
    }
  );

  useEffect(() => {
    if (!result.isError) {
      return;
    }

    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

    if (refreshToken) {
      API()
        .post("/api/users/token/refresh", { refresh: refreshToken })
        .then(async (response: AxiosResponse<Tokens>) => {
          Cookies.set(ACCESS_TOKEN_KEY, response.data.access);
          Cookies.set(REFRESH_TOKEN_KEY, response.data.refresh);
          await result.refetch();
        })
        .catch(() => {
          Cookies.remove(ACCESS_TOKEN_KEY);
          Cookies.remove(REFRESH_TOKEN_KEY);
        });
    } else {
      Cookies.remove(ACCESS_TOKEN_KEY);
      Cookies.remove(REFRESH_TOKEN_KEY);
    }
  }, [result]);

  return result;
};

export default useUser;
