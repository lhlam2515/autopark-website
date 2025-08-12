import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { verifyOTP } from "@/lib/actions/cloud.action";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";

export function useOTPVerification({ onCleanup }: { onCleanup: () => void }) {
  const [OTP, setOTP] = useState("");
  const [slotId, setSlotId] = useState("");
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  const startOTP = useCallback((otp: string, id: string) => {
    setOTP(otp);
    setSlotId(id);
  }, []);

  const handleOTPVerification = useCallback(async () => {
    if (!OTP || !slotId) return;

    try {
      const result = await verifyOTP({ OTP, slotId });

      if (result.error) {
        toast.error(result.error.message || "Verification failed");
        onCleanup();
        return;
      }

      if (result.success) {
        toast.success("OTP verified successfully!");
        onCleanup();
        router.push(ROUTES.PARKING_SESSION);
      }
    } catch (error) {
      // Handle any errors thrown during verification
      toast.error(
        error instanceof Error ? error.message : "Verification failed"
      );
      onCleanup();
    }
  }, [OTP, slotId, router, onCleanup]);

  // Countdown
  useEffect(() => {
    if (!OTP) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onCleanup();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [OTP, onCleanup]);

  // Auto verify when OTP is set
  useEffect(() => {
    if (OTP) handleOTPVerification();
  }, [OTP, handleOTPVerification]);

  return { OTP, countdown, startOTP };
}
