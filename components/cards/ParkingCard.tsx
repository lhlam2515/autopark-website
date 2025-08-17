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
import { Button } from "../ui/button";
import { pingSlot } from "@/lib/actions/cloud.action";

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
  const [ping, setPing] = useState(false);

  const { deviceId, slotId } = slot;
  const handlePingSlot = async () => {
    const { success } = await pingSlot({ deviceId, slotId, ping: !ping });
    if (success) setPing(!ping);
  };

  useEffect(() => {
    const duration = setTimeout(async () => {
      const { success } = await pingSlot({ deviceId, slotId, ping: false });
      if (success) setPing(false);
    }, 5000); // Timeout to reset ping after 5 seconds

    return () => clearTimeout(duration);
  }, [deviceId, ping, slotId]);

  useEffect(() => {
    if (paid) return; // Stop updating if paid

    const interval = setInterval(() => {
      setElapsed(calculateElapsedTime(checkInTime));
      setFee(calculateParkingFee(elapsed));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [elapsed, checkInTime, paid]);

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
          {!ping ? "Ping Slot" : "Unping Slot"}
        </Button>
      </div>
    </InfoCard>
  );
};

export default ParkingCard;
