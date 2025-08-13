"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { fetchToken } from "@/lib/firebase";
import { toast } from "sonner";
import { updatePushToken } from "@/lib/actions/user.action";
import Image from "next/image";

const getNotificationPermissionAndToken = async () => {
  // Step 1: Check if Notifications are supported in the browser.
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return null;
  }

  // Step 2: Check if permission is already granted.
  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  // Step 3: If permission is not denied, request permission from the user.
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  return null;
};

const SubscribeButton = ({ userId }: { userId: string }) => {
  const [token, setToken] = useState<string | null>(null);
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  const loadToken = async () => {
    // Step 4: Prevent multiple fetches if already fetched or in progress.
    if (isLoading.current) return;

    isLoading.current = true; // Mark loading as in progress.
    const token = await getNotificationPermissionAndToken(); // Fetch the token.

    // Step 5: Handle the case where permission is denied.
    if (Notification.permission === "denied") {
      isLoading.current = false;
      return;
    }

    // Step 6: Retry fetching the token if necessary. (up to 3 times)
    // This step is typical initially as the service worker may not be ready/installed yet.
    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, refresh the browser");
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("An error occurred while retrieving token. Retrying...");
      isLoading.current = false;
      await loadToken();
      return;
    }

    // Step 7: Set the fetched token and mark as fetched.
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  const handleSubscribe = async () => {
    if (!token) {
      toast.error("Failed to get notification permission");
      return;
    }

    const { success } = await updatePushToken({ userId, token });
    if (success) {
      toast.success("Notification subscription successful");
    } else {
      toast.error("Failed to subscribe to notifications");
    }
  };

  return (
    <Button
      className="bg-primary-500 gap-1.5 rounded-lg p-2"
      onClick={handleSubscribe}
    >
      <Image
        src="/icons/subscribe.svg"
        alt="Subscribe"
        width={24}
        height={24}
      />
      Subscribe Notifications
    </Button>
  );
};

export default SubscribeButton;
