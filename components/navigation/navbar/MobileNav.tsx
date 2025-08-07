import Image from "next/image";
import Link from "next/link";
import React from "react";

import NavLinks from "./NavLinks";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

const MobileNav = async ({ tool = false }: { tool?: boolean }) => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/menu.svg"
          width={24}
          height={24}
          alt="Menu"
          className={cn(!tool && "sm:hidden")}
        />
      </SheetTrigger>
      <SheetContent
        side={!tool ? "left" : "bottom"}
        className="bg-primary-100 border-none px-4 py-3"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        {!tool && (
          <Link href={ROUTES.DASHBOARD}>
            <p className="text-secondary-500 text-3xl font-bold max-sm:text-2xl">
              Auto<span className="text-secondary-100">Park</span>
            </p>
          </Link>
        )}

        <div className="flex h-full flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-4 py-6">
              <NavLinks isMobileNav userId={userId} />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";

                    await signOut();
                  }}
                >
                  <Button className="bg-secondary-500 min-h-[41px] w-full rounded-lg px-4 py-3 text-sm font-semibold shadow-none">
                    <LogOut className="text-primary-100 size-5" />
                    <span className="text-primary-100">Log Out</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="bg-primary-500 min-h-[41px] w-full rounded-lg px-4 py-3 text-sm font-semibold shadow-none">
                      <span className="text-primary-100">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button className="bg-primary-400 min-h-[41px] w-full rounded-lg border px-4 py-3 text-sm font-semibold shadow-none">
                      <span className="text-primary-100">Sign Up</span>
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
