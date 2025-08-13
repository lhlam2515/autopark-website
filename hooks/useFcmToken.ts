"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, messaging } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function getNotificationPermissionAndToken() {
  // Step 1: Check if Notifications are supported in the browser.
  if (!("Notification" in window)) {
    toast.info("This browser does not support desktop notification");
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

  toast.error("Notification permission not granted.");
  return null;
}

const useFcmToken = () => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null);
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
      setNotificationPermissionStatus("denied");
      isLoading.current = false;
      return;
    }

    // Step 6: Retry fetching the token if necessary. (up to 3 times)
    // This step is typical initially as the service worker may not be ready/installed yet.
    if (!token) {
      if (retryLoadToken.current >= 3) {
        toast.error("Unable to load token, refresh the browser");
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      isLoading.current = false;
      await loadToken();
      return;
    }

    // Step 7: Set the fetched token and mark as fetched.
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    // Step 8: Initialize token loading when the component mounts.
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return; // Exit if no token is available.

      const m = await messaging();
      if (!m) return;

      // Step 9: Register a listener for incoming FCM messages.
      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== "granted") return;

        const link = payload.fcmOptions?.link || payload.data?.link;

        if (link) {
          toast.info(
            `${payload.notification?.title}: ${payload.notification?.body}`,
            {
              action: {
                label: "Visit",
                onClick: () => {
                  const link = payload.fcmOptions?.link || payload.data?.link;
                  if (link) {
                    router.push(link);
                  }
                },
              },
            }
          );
        } else {
          toast.info(
            `${payload.notification?.title}: ${payload.notification?.body}`
          );
        }
      });

      return unsubscribe;
    };

    // Step 11: Cleanup the listener when the component unmounts.
    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => unsubscribe?.();
  }, [token, router]);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
