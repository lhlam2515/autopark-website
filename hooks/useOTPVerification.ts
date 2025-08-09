import { useState, useEffect, useCallback } from "react";
import {
  ref,
  onValue,
  off,
  remove,
  DataSnapshot,
  child,
} from "firebase/database";
import { database } from "@/lib/firebase";
import { getSlot } from "@/lib/actions/slot.action";
import { createSession } from "@/lib/actions/session.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

export function useOTPVerification({ onCleanup }: { onCleanup: () => void }) {
  const [OTP, setOTP] = useState("");
  const [slotId, setSlotId] = useState("");
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  const startOTP = useCallback((otp: string, id: string) => {
    setOTP(otp);
    setSlotId(id);
  }, []);

  const verifyOTP = useCallback(async () => {
    if (!OTP || !slotId) return;

    const { success, data, error } = await getSlot({ slotId });
    if (error) {
      toast.error(error.message);
      return;
    }

    if (success && data) {
      const { deviceId } = data.slot;
      const slotIndex = slotId.split("-")[1];
      const slotRef = ref(database, `devices/${deviceId}/slots/${slotIndex}`);

      const listener = async (snapshot: DataSnapshot) => {
        const firebaseOTP = snapshot.val();

        if (!firebaseOTP) {
          // Don't show error if no OTP yet
          return;
        }

        if (firebaseOTP === OTP) {
          off(slotRef, "value", listener);

          try {
            // Remove OTP from Firebase
            await remove(child(slotRef, "OTP"));

            // Create parking session
            await createSession({ slotId: data.slot._id as string });

            toast.success("OTP verified successfully!");
            router.push(ROUTES.PARKING_SESSION);
            onCleanup();
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : "Unknown error occurred";
            toast.error(`Failed to finalize verification: ${errorMessage}`);
          }
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      };

      onValue(child(slotRef, "OTP"), listener);
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
    if (OTP) verifyOTP();
  }, [OTP, verifyOTP]);

  return { OTP, countdown, startOTP };
}
