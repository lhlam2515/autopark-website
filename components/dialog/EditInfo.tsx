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
import { InfoSchema } from "@/lib/validations";
import { updateUser } from "@/lib/actions/user.action";

interface Props {
  name: string;
  username: string;
  phone?: string;
}

const EditInfo = ({ name, username, phone }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const cleanup = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild className="grow">
        <Button className="bg-primary-500 text-primary-100 p-2 text-base font-bold">
          <Image
            src="/icons/profile-edit.svg"
            width={24}
            height={24}
            alt="edit profile"
          />
          Edit Personal Information
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-secondary-500 text-2xl font-semibold">
            Edit Your Information
          </DialogTitle>
        </DialogHeader>
        <ProfileForm
          formType="info"
          schema={InfoSchema}
          defaultValues={{ name, username, phone: phone || "" }}
          onSubmit={async (data) => {
            cleanup();
            return await updateUser(data);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditInfo;
