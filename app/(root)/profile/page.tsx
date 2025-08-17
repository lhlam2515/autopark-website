import React from "react";
import Link from "next/link";

import InfoCard from "@/components/cards/InfoCard";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUser } from "@/lib/actions/user.action";
import UserCard from "@/components/cards/UserCard";
import EditInfo from "@/components/dialog/EditInfo";
import EditCredit from "@/components/dialog/EditCredit";
import CreditCard from "@/components/cards/CreditCard";

const UserProfile = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect(ROUTES.SIGN_IN);
  }

  const { success, data, error } = await getUser({ userId: session.user.id! });
  if (!success) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-secondary-500 text-center text-2xl font-bold">
          {error?.message}
        </p>
      </div>
    );
  }

  const { user } = data!;

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <section className="mt-2.5 flex w-full flex-col items-start justify-center px-2">
        <h1 className="text-primary-400 text-[2.5rem] leading-tight font-bold tracking-tight">
          Your <span className="text-secondary-500">Profile</span>
        </h1>

        <p className="text-secondary-100 text-2xl font-normal">
          Manage your personal and subscription information.
        </p>
      </section>

      <div className="flex w-full grow-1 flex-col items-center gap-3 px-3 py-2">
        <UserCard name={user.name} email={user.email} phone={user.phone} />
        <CreditCard cardNumber={user.cardNumber} cardExpiry={user.cardExpiry} />
        <InfoCard title="Edit Profile" imgUrl="/icons/edit.svg">
          <div className="flex w-full flex-col gap-2.5 px-4">
            <EditInfo
              name={user.name}
              username={user.username}
              phone={user.phone}
            />
            <EditCredit
              cardNumber={user.cardNumber}
              cardExpiry={user.cardExpiry}
            />
          </div>
        </InfoCard>
      </div>

      <ToolBar>
        <Button asChild className="bg-primary-500 text-primary-100 grow p-2">
          <Link href={ROUTES.HOME}>Home</Link>
        </Button>
      </ToolBar>
    </div>
  );
};

export default UserProfile;
