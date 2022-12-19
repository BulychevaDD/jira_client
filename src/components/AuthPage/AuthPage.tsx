import styles from "./AuthPage.module.css";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useRouter } from "next/router";
import { BASE_ROUTE } from "../../constants/routes";
import useUser from "../../hooks/useUser";

type FormType = "register" | "login";

const AuthPage: React.FC = () => {
  const router = useRouter();

  const { data: userData } = useUser();

  useEffect(() => {
    if (userData) {
      router.replace(BASE_ROUTE).then();
    }
  }, [userData, router]);

  const [currentForm, setCurrentForm] = useState<FormType>("login");

  const handleLoginClick = () => {
    setCurrentForm("login");
  };

  const handleRegisterClick = () => {
    setCurrentForm("register");
  };

  const handleRegisterComplete = () => {
    setCurrentForm("login");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.chooseActionContainer}>
          <button onClick={handleLoginClick}>Вход</button>
          <button onClick={handleRegisterClick}>Регистрация</button>
        </div>
        {currentForm === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm onComplete={handleRegisterComplete} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
