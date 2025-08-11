import React from "react";
import Entry from "../Entry";
import InfoCard from "./InfoCard";
import StatusIcon from "../StatusIcon";

interface Props {
  slotId: string;
  location: string;
  locked: boolean;
}

const SlotCard = async ({ slotId, location, locked }: Props) => {
  return (
    <InfoCard title="Slot Details" imgUrl="/icons/location.svg">
      <div className="flex w-full flex-col gap-2.5 px-4">
        <Entry label="Slot ID">{slotId}</Entry>
        <Entry label="Location">{location}</Entry>
        <Entry label="Status">
          {locked ? (
            <StatusIcon
              src="/icons/green-circle.svg"
              alt="Locked"
              text="Locked"
            />
          ) : (
            <StatusIcon
              src="/icons/red-circle.svg"
              alt="Unlocked"
              text="Unlocked"
            />
          )}
        </Entry>
      </div>
    </InfoCard>
  );
};

export default SlotCard;
