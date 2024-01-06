import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "../libs/auth/NextAuthProvider";
import GoogleOneTabLayout from "./layout/GoogleOneTapLayout";
import axios from "axios";

import { cookies } from "next/headers";

const latoFont = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Map",
  description: "Map generated for interesting people to meeting up!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const sessionId = cookieStore.get("sessionId");

  const renderUser = async () => {
    if (sessionId) {
      const { data } = await axios.get(
        "http://localhost:4000/trpc/user.me",
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + sessionId?.value,
          },
        }
      );

      return <div className="">{data?.result?.data?.name}</div>;
    }

    return null;
  };

  return (
    <html lang="en">
      <body className={latoFont.className}>
        <NextAuthProvider>
          <GoogleOneTabLayout isLoggedIn>
            {<div className="">{sessionId?.value}</div> || "dd"}
            {renderUser()}
            {children}
          </GoogleOneTabLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
