"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOTPVerification } from "@/hooks/useOTPVerification";
import OTPForm from "./OTPForm";

export default function SlotForm() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const cleanup = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const { OTP, countdown, startOTP } = useOTPVerification({
    onCleanup: cleanup,
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className="grow">
        <Button className="bg-primary-500 text-primary-100 p-2 text-base font-bold">
          Enter your slot ID
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-secondary-500 text-2xl font-semibold">
            {OTP ? "Here is your OTP" : "Enter your slot ID"}
          </DialogTitle>
          <DialogDescription className="text-secondary-100 text-base font-normal">
            {OTP
              ? "Enter OTP to your parking slot to access control"
              : "To get your parking slot."}
          </DialogDescription>
        </DialogHeader>
        {OTP ? (
          <>
            <p className="text-center text-5xl font-bold text-black">{OTP}</p>
            <DialogFooter className="flex flex-row items-center justify-end">
              <Image
                src="/icons/expiry.svg"
                alt="Expiry Icon"
                width={20}
                height={20}
              />
              <p className="text-secondary-100 text-sm">
                Expires after {countdown} seconds
              </p>
            </DialogFooter>
          </>
        ) : (
          <OTPForm onGetOTP={(otp, slotId) => startOTP(otp, slotId)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
