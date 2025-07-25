import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const SocialAuthForm = () => {
  return (
    <Button className="border-secondary-500 bg-primary-100 text-black-500 hover:bg-primary-300 w-full border py-2">
      <Image
        src="./icons/google.svg"
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
