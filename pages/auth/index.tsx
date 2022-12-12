import { NextPage } from "next";
import Head from "next/head";
import AuthPage from "../../src/components/AuthPage/AuthPage";

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>Вход / Регистрация</title>
      </Head>
      <AuthPage />
    </>
  );
};

export default Auth;
