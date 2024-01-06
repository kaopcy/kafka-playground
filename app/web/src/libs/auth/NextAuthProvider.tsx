"use client";

import { env } from "@/app/configs/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const NextAuthProvider: FC<Props> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={env.googleAuthId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default NextAuthProvider;
