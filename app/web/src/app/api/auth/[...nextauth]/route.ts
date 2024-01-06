import { env } from "@/app/configs/env";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "259770563655-omc9d5aut5i9v4v9j415os48v8vaguc9.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: env.authSecret,
  debug: true
});

export { handler as GET, handler as POST };
