import { NextPage } from "next";
import Head from "next/head";
import HomePage from "../src/components/HomePage/HomePage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Домашняя страница</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
