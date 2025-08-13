import React from "react";
import Image from "next/image";
import Link from "next/link";

import InfoCard from "@/components/cards/InfoCard";
import Entry from "@/components/Entry";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getUser } from "@/lib/actions/user.action";
import SubscribeButton from "@/components/SubscribeButton";

const UserProfile = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) notFound();

  const loggedInUser = await auth();
  if (!loggedInUser || loggedInUser?.user?.id !== id) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-secondary-500 text-center text-2xl font-bold">
          You are not authorized to view this profile.
        </p>
      </div>
    );
  }

  const { success, data, error } = await getUser({ userId: id });
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
        <h1 className="text-primary-400 text-5xl font-bold">
          Your <span className="text-secondary-500">Profile</span>
        </h1>

        <p className="text-secondary-100 text-3xl font-normal">
          Manage your personal and subscription information.
        </p>
      </section>

      <div className="flex w-full grow-1 flex-col items-center gap-3 px-3 py-2">
        <InfoCard title="User Information" imgUrl="/icons/profile.svg">
          <div className="flex w-full flex-col gap-2.5 px-4">
            <Entry label="Full name" imgUrl="/icons/person.svg">
              <p className="text-secondary-100 text-base font-normal">
                {user.name}
              </p>
            </Entry>
            <Entry label="Email" imgUrl="/icons/email.svg">
              <p className="text-secondary-100 text-base font-normal">
                {user.email}
              </p>
            </Entry>
            <Entry label="Phone" imgUrl="/icons/phone.svg">
              <p className="text-secondary-100 text-base font-normal">
                {user.phone || "Not provided"}
              </p>
            </Entry>
          </div>
        </InfoCard>
        <InfoCard title="Payment Details" imgUrl="/icons/wallet.svg">
          <div className="flex w-full flex-col gap-2.5 px-4">
            <Entry label="Card number" imgUrl="/icons/card.svg">
              <p className="text-secondary-100 text-base font-normal">
                {user?.cardNumber
                  ? user.cardNumber.slice(7).replace(/\d(?=\d{4})/g, "*")
                  : "Not provided"}
              </p>
            </Entry>
            <Entry label="Expiry" imgUrl="/icons/clock.svg">
              <p className="text-secondary-100 text-base font-normal">
                {user?.cardExpiry || "Not provided"}
              </p>
            </Entry>
          </div>
        </InfoCard>
        <InfoCard title="Edit Profile" imgUrl="/icons/edit.svg">
          <div className="flex w-full flex-col gap-2.5 px-4">
            <Button asChild className="bg-primary-500 gap-1.5 rounded-lg p-2">
              <Link href={ROUTES.EDIT_PROFILE}>
                <Image
                  src="/icons/profile-edit.svg"
                  width={24}
                  height={24}
                  alt="edit profile"
                />
                Edit Personal Information
              </Link>
            </Button>
            <SubscribeButton userId={id} />
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
