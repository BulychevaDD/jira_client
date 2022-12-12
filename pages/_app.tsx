import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AUTH_ROUTE } from "../src/constants/routes";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(AUTH_ROUTE).then();
  }, [router]);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
