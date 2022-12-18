import styles from "./Header.module.css";
import React from "react";
import Button from "../../common/Button/Button";
import Cookies from "js-cookie";
import useUser from "../../../hooks/useUser";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../../../constants/storageKeys";
import { useRouter } from "next/router";
import { AUTH_ROUTE } from "../../../constants/routes";

const Header: React.FC = () => {
  const router = useRouter();

  const { data: userData, remove } = useUser();

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    router.replace(AUTH_ROUTE).then();
    remove();
  };

  return userData && router.pathname !== AUTH_ROUTE ? (
    <div className={styles.container}>
      <div>СУЗ</div>
      <div>
        {userData.firstName} {userData.lastName}
      </div>
      <div>
        <Button onClick={handleLogout}>Выход</Button>
      </div>
    </div>
  ) : null;
};

export default Header;
