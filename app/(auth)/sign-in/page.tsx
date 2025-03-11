"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GetAuthUserData } from "@/services/GlobalApi";

function SignIn() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      if (typeof window === "undefined") {
        localStorage.setItem("token", tokenResponse.access_token);
      }

      const user=GetAuthUserData(tokenResponse.access_token);
      console.log(user);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md">
        <Image src={"/logo.svg"} alt="logo" width={50} height={50} />

        <h2 className="text-2xl">Sign In To Personal AI Assistant & Agent</h2>

        <Button onClick={() => googleLogin()}>Sign In With Gmail</Button>
      </div>
    </div>
  );
}

export default SignIn;
