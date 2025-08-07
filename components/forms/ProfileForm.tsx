"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { IUserDoc } from "@/database/user.model";
import { ProfileSchema } from "@/lib/validations";

const ProfileForm = ({ user }: { user: IUserDoc }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      phone: user.phone || "",
      cardNumber: user.cardNumber || "",
      cardExpiry: user.cardExpiry || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast.success("Your profile has been updated successfully!");

        router.push(ROUTES.PROFILE(user._id as string));
      } else {
        toast.error(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="bg-primary-100 flex w-full flex-1 flex-col items-center gap-3 rounded-xl px-1.5 py-2 shadow-md"
        onSubmit={form.handleSubmit(handleUpdateProfile)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="text-secondary-500 text-md font-semibold">
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black-500 border-secondary-100 bg-primary-100 rounded-sm border p-2.5 text-sm font-semibold"
                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="text-secondary-500 text-md font-semibold">
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black-500 border-secondary-100 bg-primary-100 rounded-sm border p-2.5 text-sm font-semibold"
                  placeholder="Your Username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="text-secondary-500 text-md font-semibold">
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black-500 border-secondary-100 bg-primary-100 rounded-sm border p-2.5 text-sm font-semibold"
                  placeholder="Your Phone Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="text-secondary-500 text-md font-semibold">
                Card Number
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black-500 border-secondary-100 bg-primary-100 rounded-sm border p-2.5 text-sm font-semibold"
                  placeholder="Your Card Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardExpiry"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel className="text-secondary-500 text-md font-semibold">
                Card Expiry
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black-500 border-secondary-100 bg-primary-100 rounded-sm border p-2.5 text-sm font-semibold"
                  placeholder="Your Card Expiry Date (MM/YY)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-7 flex w-full justify-end">
          <Button
            type="submit"
            className="bg-primary-500 text-primary-100 hover:bg-primary-400 w-full rounded-lg p-2 text-base font-bold"
            disabled={isPending}
          >
            {isPending ? <>Submitting...</> : <>Submit</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
