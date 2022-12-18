import React from "react";
import * as Yup from "yup";
import { API } from "../../../services/apiService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "../RegisterForm/RegisterForm.module.css";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "../../../constants/storageKeys";
import { Tokens } from "../../../types/user";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
  const handleSubmit = async (values: LoginData) => {
    await API()
      .post("/api/users/token", {
        username: values.username,
        password: values.password,
      })
      .then((response: AxiosResponse<Tokens>) => {
        console.log(response.data);
        Cookies.set(ACCESS_TOKEN_KEY, response.data.access);
        Cookies.set(REFRESH_TOKEN_KEY, response.data.refresh);
      });
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {() => (
        <Form className={styles.form}>
          <div>
            <label htmlFor="username">Логин</label>
            <Field type="text" name="username" id="username" />
            <ErrorMessage name="username" />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" />
          </div>
          <button type="submit">Вход</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
