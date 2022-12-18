import React, {useEffect} from "react";
import {useRouter} from "next/router";
import useUser from "../../hooks/useUser";
import {AUTH_ROUTE} from "../../constants/routes";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const { data: userData } = useUser();

  useEffect(() => {
    if (!userData) {
      router.replace(AUTH_ROUTE).then();
    }
  }, [router, userData]);

  return <>{children}</>;
};

export default Layout;
