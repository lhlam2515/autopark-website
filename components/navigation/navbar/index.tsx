import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

const Navbar = ({ admin }: { admin: boolean }) => {
  return (
    <nav className="border-secondary-500 bg-primary-100 fixed z-50 flex w-full justify-between gap-5 border-b p-6">
      <Link
        href={admin ? ROUTES.DASHBOARD : ROUTES.HOME}
        className="flex items-center"
      >
        <p className="text-secondary-500 text-3xl font-bold">
          Auto<span className="text-secondary-100">Park</span>
        </p>
      </Link>

      <div className="flex justify-between gap-5">
        <p>Notification</p>
        <p>Profile</p>
      </div>
    </nav>
  );
};

export default Navbar;
