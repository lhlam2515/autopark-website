"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateOTP } from "@/lib/utils";

const formSchema = z.object({
  slotID: z.string().min(4, {
    message: "Slot ID must be at least 4 characters.",
  }),
});

const SlotForm = () => {
  const [OTP, setOTP] = useState("");
  const [slotID, setSlotID] = useState("");
  const [countdown, setCountdown] = useState(60);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slotID: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setOTP(generateOTP());
    setSlotID(values.slotID);
  };

  useEffect(() => {
    if (OTP) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setOTP("");
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [OTP]);

  const GetOTPForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="slotID"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Slot ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your slot ID..."
                  {...field}
                  className="border-secondary-100 px-2.5 py-4 text-center text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500 text-primary-100 w-full p-2 text-base font-semibold"
        >
          Get Parking Slot
        </Button>
      </form>
    </Form>
  );

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
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
                Expires after {countdown} seconds{" "}
              </p>
            </DialogFooter>
          </>
        ) : (
          <GetOTPForm />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SlotForm;
