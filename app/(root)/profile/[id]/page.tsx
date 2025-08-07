import React from "react";
import Image from "next/image";
import Link from "next/link";

import InfoCard from "@/components/cards/InfoCard";
import Entry from "@/components/Entry";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const UserProfile = () => {
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
                Nguyen Van A
              </p>
            </Entry>
            <Entry label="Email" imgUrl="/icons/email.svg">
              <p className="text-secondary-100 text-base font-normal">
                user@example.com
              </p>
            </Entry>
            <Entry label="Phone" imgUrl="/icons/phone.svg">
              <p className="text-secondary-100 text-base font-normal">
                0987654321
              </p>
            </Entry>
          </div>
        </InfoCard>
        <InfoCard title="Payment Details" imgUrl="/icons/wallet.svg">
          <div className="flex w-full flex-col gap-2.5 px-4">
            <Entry label="Card number" imgUrl="/icons/card.svg">
              <p className="text-secondary-100 text-base font-normal">
                Visa ••••1234
              </p>
            </Entry>
            <Entry label="Expiry" imgUrl="/icons/clock.svg">
              <p className="text-secondary-100 text-base font-normal">09/28</p>
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
            <Button asChild className="bg-primary-500 gap-1.5 rounded-lg p-2">
              <Link href={ROUTES.EDIT_PROFILE}>
                <Image
                  src="/icons/card-edit.svg"
                  width={24}
                  height={24}
                  alt="edit card"
                />
                Edit Payment Information
              </Link>
            </Button>
          </div>
        </InfoCard>
      </div>

      <ToolBar
        buttonLabel="Home"
        buttonStyle="bg-primary-500 text-primary-100"
      />
    </div>
  );
};

export default UserProfile;
