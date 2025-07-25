import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

const Navbar = ({ admin = false }: { admin?: boolean }) => {
  return (
    <nav
      className={cn(
        admin ? "bg-primary-100" : "bg-primary-300",
        "border-secondary-500 fixed z-50 flex w-full justify-between gap-5 border-b p-6 max-sm:p-3"
      )}
    >
      <Link
        href={admin ? ROUTES.DASHBOARD : ROUTES.HOME}
        className="flex items-center"
      >
        <p className="text-secondary-500 text-3xl font-bold">
          Auto<span className="text-secondary-100">Park</span>
        </p>
      </Link>

      <div className="flex justify-between gap-2">
        <Image
          src="./icons/notice.svg"
          alt="Notification"
          width={24}
          height={24}
        />
        <Image src="./icons/avatar.svg" alt="Profile" width={24} height={24} />
      </div>
    </nav>
  );
};

export default Navbar;
