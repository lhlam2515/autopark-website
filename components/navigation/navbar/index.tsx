import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import Notification from "@/components/Notification";

const Navbar = async ({ admin = false }: { admin?: boolean }) => {
  const session = await auth();

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
        <Notification userId={session?.user?.id || ""} />
        {session?.user?.id && (
          <UserAvatar
            name={session.user.name!}
            imageUrl={session.user?.image}
          />
        )}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
