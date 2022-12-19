import { useQuery, UseQueryResult } from "react-query";
import { GET_USER_INFO_KEY } from "../constants/queryKeys";
import { API } from "../services/apiService";
import { UserInfo } from "../types/user";
import { isClientSide } from "../utils/common";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import Cookies from "js-cookie";

const useUser = (): UseQueryResult<UserInfo> => {
  const result = useQuery(
    GET_USER_INFO_KEY,
    () =>
      API()
        .get("/api/users/info")
        .then((response) => ({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          username: response.data.username,
        }))
        .catch((error) => {
          result.remove();
          Cookies.remove(ACCESS_TOKEN_KEY);
          return error;
        }),
    {
      enabled: isClientSide() && Boolean(Cookies.get(ACCESS_TOKEN_KEY)),
    }
  );

  return result;
};

export default useUser;
