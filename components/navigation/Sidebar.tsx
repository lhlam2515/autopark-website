import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

import NavLinks from "./navbar/NavLinks";
import { Button } from "../ui/button";

const Sidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <section className="border-secondary-500 bg-primary-100 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-24 max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>

      <div className="flex flex-col gap-3">
        {userId ? (
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button className="bg-secondary-500 min-h-[41px] w-full rounded-lg px-4 py-3 text-sm font-semibold shadow-none">
              <LogOut className="text-secondary-100 size-5" />
              <span className="text-secondary-100">Log Out</span>
            </Button>
          </form>
        ) : (
          <>
            <Button
              asChild
              className="bg-primary-500 min-h-[41px] w-full rounded-lg px-4 py-3 text-sm font-semibold shadow-none"
            >
              <Link href={ROUTES.SIGN_IN}>
                <span className="text-primary-100">Log In</span>
              </Link>
            </Button>

            <Button
              asChild
              className="bg-primary-400 min-h-[41px] w-full rounded-lg border px-4 py-3 text-sm font-semibold shadow-none"
            >
              <Link href={ROUTES.SIGN_UP}>
                <span className="text-primary-100">Sign Up</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
