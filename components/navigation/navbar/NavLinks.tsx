"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { sidebarLinks } from "@/constants/admin";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive && "bg-primary-300",
              "flex items-center justify-start gap-4 rounded-lg p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className="object-cover"
            />
            <p
              className={cn(
                isActive ? "font-bold" : "font-medium",
                "text-secondary-500 text-xl"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
