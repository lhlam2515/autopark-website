import React from "react";
import Entry from "../Entry";
import InfoCard from "./InfoCard";

interface Props {
  name: string;
  email: string;
  phone?: string;
}

const UserCard = ({ name, email, phone }: Props) => {
  return (
    <InfoCard title="User Information" imgUrl="/icons/profile.svg">
      <div className="flex w-full flex-col gap-2.5 px-4">
        <Entry label="Full name" imgUrl="/icons/person.svg">
          <p className="text-secondary-100 text-base font-normal">{name}</p>
        </Entry>
        <Entry label="Email" imgUrl="/icons/email.svg">
          <p className="text-secondary-100 text-base font-normal">{email}</p>
        </Entry>
        <Entry label="Phone" imgUrl="/icons/phone.svg">
          <p className="text-secondary-100 text-base font-normal">
            {phone || "Not provided"}
          </p>
        </Entry>
      </div>
    </InfoCard>
  );
};

export default UserCard;
