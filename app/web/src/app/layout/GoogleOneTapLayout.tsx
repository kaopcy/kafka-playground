"use client";

import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoggedIn: boolean;
};

const GoogleOneTabLayout: FC<Props> = ({ children, isLoggedIn }) => {
  console.log('first')
  useGoogleOneTapLogin({
    async onSuccess(credentialResponse) {
      const user = await axios.get(
        "http://localhost:4000/trpc/auth.googleLogin",
        {
          params: {
            input: JSON.stringify({
              accessToken: credentialResponse.credential,
              state: "ddd",
            }),
          },
          withCredentials: true
        }
      );
      console.log(user)
    },
  });

  const test = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (ee)=> {
      console.log(ee.code)
    }
  })

  return <div>
    <div className="text-black" onClick={()=> test()}>wdwdw</div>
    {children}</div>;
};

export default GoogleOneTabLayout;
