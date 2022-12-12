import React from "react";
import * as Yup from "yup";

interface LoginData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Слишком короткое имя пользователя")
    .max(32, "Слишком длинное имя пользователя")
    .required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const loginInitialValues: LoginData = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  return null;
};

export default LoginForm;
