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
import { Button } from "../ui/button";
import { processPayment } from "@/lib/actions/session.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

interface Props {
  checkInTime: Date;
  paymentStatus: "paid" | "unpaid";
}

const PaymentCard = ({ checkInTime, paymentStatus }: Props) => {
  const router = useRouter();
  const initialFee = calculateParkingFee(calculateElapsedTime(checkInTime));
  const [fee, setFee] = useState(initialFee);

  useEffect(() => {
    const interval = setInterval(() => {
      setFee(calculateParkingFee(calculateElapsedTime(checkInTime)));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [checkInTime]);

  const handlePayment = async () => {
    // Implement payment logic here
    const { success, error } = await processPayment({ fee });

    if (success) {
      toast.success("Payment successful");
      router.push(ROUTES.PARKING_SESSION);
    } else {
      toast.error("Payment failed", {
        description: error?.message,
        dismissible: true,
      });
    }
  };

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
        {paymentStatus === "unpaid" && (
          <Button
            className="bg-primary-500 hover:bg-primary-400 text-primary-100 text-base font-semibold"
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        )}
      </div>
    </InfoCard>
  );
};

export default PaymentCard;
