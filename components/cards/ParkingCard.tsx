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

const ParkingCard = ({ checkInTime }: { checkInTime: Date }) => {
  const initialElapsed = calculateElapsedTime(checkInTime);
  const initialFee = calculateParkingFee(initialElapsed);

  const [elapsed, setElapsed] = useState(initialElapsed);
  const [fee, setFee] = useState(initialFee);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateElapsedTime(checkInTime));
      setFee(calculateParkingFee(elapsed));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [elapsed, checkInTime]);

  return (
    <InfoCard title="Parking Status" imgUrl="/icons/clock.svg">
      <div className="flex w-full flex-col gap-2.5 px-4">
        <Entry label="Check-in Time">{formatDate(checkInTime)}</Entry>
        <Entry label="Elapsed Time">{formatDuration(elapsed)}</Entry>
        <Entry label="Parking Fee">{formatCurrency(fee)}</Entry>
      </div>
    </InfoCard>
  );
};

export default ParkingCard;
