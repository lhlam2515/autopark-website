"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";

const SocialAuthForm = () => {
  const handleSignIn = async (provider: string) => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: true,
      });
    } catch (error) {
      console.log(error);

      toast.error("Sign-in Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occured during sign-in",
      });
    }
  };

  return (
    <Button
      className="border-secondary-500 bg-primary-100 text-black-500 hover:bg-primary-300 w-full border py-2"
      onClick={() => handleSignIn("google")}
    >
      <Image
        src="/icons/google.svg"
        alt="Google Logo"
        width={20}
        height={20}
        className="mr-2.5 object-contain"
      />
      <span>Log in with Google</span>
    </Button>
  );
};

export default SocialAuthForm;
