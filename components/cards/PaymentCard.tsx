"use client";

import React, { useEffect, useState } from "react";
import StatusIcon from "../StatusIcon";
import Entry from "../Entry";
import {
  calculateElapsedTime,
  calculateParkingFee,
  formatCurrency,
} from "@/lib/utils";
import InfoCard from "./InfoCard";

interface Props {
  checkInTime: Date;
  paymentStatus: "paid" | "unpaid";
}

const PaymentCard = ({ checkInTime, paymentStatus }: Props) => {
  const initialFee = calculateParkingFee(calculateElapsedTime(checkInTime));
  const [fee, setFee] = useState(initialFee);

  useEffect(() => {
    const interval = setInterval(() => {
      setFee(calculateParkingFee(calculateElapsedTime(checkInTime)));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [checkInTime]);

  return (
    <InfoCard title="Payment Status" imgUrl="/icons/payment.svg">
      <div className="flex w-full flex-col gap-2.5 px-4">
        <Entry label="Amount Due">{formatCurrency(fee)}</Entry>
        <Entry label="Status">
          {paymentStatus === "paid" ? (
            <StatusIcon src="/icons/green-circle.svg" alt="Paid" text="Paid" />
          ) : (
            <StatusIcon
              src="/icons/yellow-circle.svg"
              alt="Unpaid"
              text="Unpaid"
            />
          )}
        </Entry>
      </div>
    </InfoCard>
  );
};

export default PaymentCard;
