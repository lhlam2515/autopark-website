import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback } from "./ui/avatar";

import ROUTES from "@/constants/routes";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
}

const UserAvatar = ({ id, name, imageUrl, className = "h-6 w-6" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover"
            width={24}
            height={24}
            quality={100}
          />
        ) : (
          <AvatarFallback className="bg-primary-500 text-primary-100 tracking-tight">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
