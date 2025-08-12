"use client";

import React, { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import Entry from "../Entry";
import {
  calculateElapsedTime,
  calculateParkingFee,
  formatCurrency,
  formatDate,
  formatDuration,
} from "@/lib/utils";
import { database } from "@/lib/firebase";
import { set, ref, child } from "firebase/database";
import { Button } from "../ui/button";

interface Props {
  slot: {
    deviceId: string;
    slotId: string;
    location: string;
  };
  checkInTime: Date;
  paid: boolean;
}

const ParkingCard = ({ slot, checkInTime, paid }: Props) => {
  const initialElapsed = calculateElapsedTime(checkInTime);
  const initialFee = calculateParkingFee(initialElapsed);

  const [elapsed, setElapsed] = useState(initialElapsed);
  const [fee, setFee] = useState(initialFee);

  useEffect(() => {
    if (paid) return; // Stop updating if paid

    const interval = setInterval(() => {
      setElapsed(calculateElapsedTime(checkInTime));
      setFee(calculateParkingFee(elapsed));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [elapsed, checkInTime, paid]);

  const handlePingSlot = async () => {
    const slotIndex = slot.slotId.split("-")[1];
    const slotRef = ref(
      database,
      `/devices/${slot.deviceId}/slots/${slotIndex}`
    );

    await set(child(slotRef, "ping"), true);
  };

  return (
    <InfoCard title="Parking Status" imgUrl="/icons/clock.svg">
      <div className="flex w-full flex-col gap-2.5 px-4">
        <Entry label="Check-in Time">{formatDate(checkInTime)}</Entry>
        <Entry label="Elapsed Time">{formatDuration(elapsed)}</Entry>
        <Entry label="Parking Fee">{formatCurrency(fee)}</Entry>
        <Button
          className="bg-primary-500 hover:bg-primary-400 text-primary-100 text-base font-semibold"
          onClick={handlePingSlot}
        >
          Ping Slot
        </Button>
      </div>
    </InfoCard>
  );
};

export default ParkingCard;
