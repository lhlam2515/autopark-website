import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateOTP } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkSlotAvailability } from "@/lib/actions/slot.action";
import { toast } from "sonner";

const formSchema = z.object({
  slotId: z
    .string()
    .min(4, { message: "Slot ID must be at least 4 characters." }),
});

interface Props {
  onGetOTP: (otp: string, slotId: string) => void;
}

const OTPForm = ({ onGetOTP }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { slotId: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    checkSlotAvailability({
      slotId: values.slotId,
    })
      .then(({ success, data }) => {
        if (!success) {
          toast.error("Failed to check slot availability.");
          return;
        }

        if (data && !data.isAvailable) {
          toast.error("Slot ID is not available.");
        } else {
          toast.success("Slot ID is available.");
          const otp = generateOTP();
          onGetOTP(otp, values.slotId);
        }
      })
      .finally(() => {
        form.reset();
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="slotId"
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
};

export default OTPForm;
