"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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

interface ProfileFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "info" | "credit";
}

const ProfileForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: ProfileFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result.success) {
      toast.success(
        formType === "info"
          ? "Your profile information has been updated successfully!"
          : "Your credit information has been updated successfully!"
      );

      router.push(ROUTES.PROFILE);
    } else {
      toast.error(`Error (${result.status})`, {
        description: result.error?.message,
        closeButton: true,
      });
    }
  };

  const buttonText = formType === "info" ? "Update Info" : "Update Credit";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="text-secondary-500 text-md font-semibold">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-black-500 border-secondary-100 bg-primary-100 rounded-sm border p-2.5 text-sm font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className="bg-primary-500 text-primary-100 hover:bg-primary-400 w-full rounded-lg p-2 text-base font-bold"
        >
          {form.formState.isSubmitting
            ? buttonText === "Update Info"
              ? "Updating Info..."
              : "Updating Credit..."
            : buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
