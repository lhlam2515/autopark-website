"use client";

import React, { useCallback, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProfileForm from "../forms/ProfileForm";
import { updateUser } from "@/lib/actions/user.action";
import { CreditSchema } from "@/lib/validations";

interface Props {
  cardNumber?: string;
  cardExpiry?: string;
}

const EditCredit = ({ cardNumber, cardExpiry }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const cleanup = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className="grow">
        <Button className="bg-primary-500 text-primary-100 p-2 text-base font-bold">
          <Image
            src="/icons/credit-edit.svg"
            width={24}
            height={24}
            alt="edit credit"
          />
          Edit Credit Information
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-secondary-500 text-2xl font-semibold">
            Edit Your Credit Information
          </DialogTitle>
        </DialogHeader>
        <ProfileForm
          formType="credit"
          schema={CreditSchema}
          defaultValues={{
            cardNumber: cardNumber || "",
            cardExpiry: cardExpiry || "",
          }}
          onSubmit={async (data) => {
            cleanup();
            return await updateUser(data);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCredit;
