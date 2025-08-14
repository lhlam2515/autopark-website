"use client";

import useFcmToken from "@/hooks/useFcmToken";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { updatePushToken } from "@/lib/actions/cloud.action";
import { toast } from "sonner";

const Notification = ({ userId }: { userId: string }) => {
  const { token, notificationPermissionStatus } = useFcmToken();
  const initialized = useRef(false);

  useEffect(() => {
    if (!userId) return; // If no userId, do nothing

    if (!initialized.current && token) {
      initialized.current = true;

      updatePushToken({ userId, token }).then((payload) => {
        if (payload.success) {
          toast.success("Push token updated successfully");
        } else {
          toast.error("Failed to update push token");
        }
      });
    }
  }, [token, userId]);

  return notificationPermissionStatus === "granted" ? (
    <Image src="/icons/notice.svg" alt="Notification" width={24} height={24} />
  ) : (
    <Image
      src="/icons/notice-off.svg"
      alt="Notification Off"
      width={24}
      height={24}
    />
  );
};

export default Notification;
