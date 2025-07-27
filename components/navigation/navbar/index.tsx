import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

const Navbar = ({ admin = false }: { admin?: boolean }) => {
  return (
    <nav
      className={cn(
        admin ? "bg-primary-100 p-6" : "bg-primary-300 p-3",
        "border-secondary-500 fixed z-50 flex w-full justify-between gap-5 border-b"
      )}
    >
      <Link href={admin ? ROUTES.DASHBOARD : ROUTES.HOME}>
        <p className="text-secondary-500 text-3xl font-bold max-sm:text-2xl">
          Auto<span className="text-secondary-100">Park</span>
        </p>
      </Link>

      <div className="flex items-center justify-between gap-2">
        <Image
          src="./icons/notice.svg"
          alt="Notification"
          width={24}
          height={24}
        />
        <Image src="./icons/avatar.svg" alt="Profile" width={24} height={24} />
        <MobileNav admin />
      </div>
    </nav>
  );
};

export default Navbar;
