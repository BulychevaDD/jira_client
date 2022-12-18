import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./RegisterForm.module.css";
import { API } from "../../../services/apiService";

interface RegistrationData {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Слишком короткое имя пользователя")
    .max(32, "Слишком длинное имя пользователя")
    .required("Обязательное поле"),
  firstName: Yup.string()
    .min(3, "Слишком короткое имя")
    .max(32, "Слишком длинное имя")
    .required("Обязательное поле"),
  lastName: Yup.string()
    .min(3, "Слишком короткая фамилия")
    .max(32, "Слишком длинная фамилия")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Слишком ненадежный пароль")
    .max(32, "Слишком длинный пароль")
    .required("Обязательное поле"),
});

const registerInitialValues: RegistrationData = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
};

interface RegisterFormProps {
  onComplete?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onComplete }) => {
  const handleSubmit = async (values: RegistrationData) => {
    await API().post("/api/users/register", {
      username: values.username,
      first_name: values.firstName,
      last_name: values.lastName,
      password: values.password,
    });
    onComplete?.();
  };

  return (
    <Formik
      initialValues={registerInitialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      {() => (
        <Form className={styles.form}>
          <div>
            <label htmlFor="username">Логин</label>
            <Field type="text" name="username" id="username" />
            <ErrorMessage name="username" />
          </div>
          <div>
            <label htmlFor="firstName">Имя</label>
            <Field type="text" name="firstName" id="firstName" />
            <ErrorMessage name="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Фамилия</label>
            <Field type="text" name="lastName" id="lastName" />
            <ErrorMessage name="lastName" />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" />
          </div>
          <button type="submit">Регистрация</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
