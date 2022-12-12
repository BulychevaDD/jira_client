import styles from "./AuthPage.module.css";
import React, { useState } from "react";
import Button from "../common/Button/Button";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

type FormType = "register" | "login";

const AuthPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<FormType>("login");

  const handleLoginClick = () => {
    setCurrentForm("login");
  };

  const handleRegisterClick = () => {
    setCurrentForm("register");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.chooseActionContainer}>
          <Button onClick={handleLoginClick}>Вход</Button>
          <Button onClick={handleRegisterClick}>Регистрация</Button>
        </div>
        {currentForm === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;
