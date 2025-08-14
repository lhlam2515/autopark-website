import admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

import { WeatherEntry } from "./types";

export const getTimestamp = (timestamp: string | number): number => {
  return typeof timestamp === "string" ? Date.parse(timestamp) : timestamp;
};

// Helper to send FCM notification
export const sendWeatherToUser = async ({
  userId,
  weatherData,
}: {
  userId: string;
  weatherData: WeatherEntry;
}) => {
  const userSnap = await admin.database().ref(`/users/${userId}`).get();
  if (!userSnap.exists()) {
    logger.error(`User ${userId} not found.`);
    return;
  }

  const fcmToken = userSnap.val().fcmToken;
  if (!fcmToken) {
    logger.error(`No FCM token for user ${userId}`);
    return;
  }

  const rain = weatherData.rain;
  const message = {
    token: fcmToken,
    notification: {
      title: `Weather Update for Parking Station`,
      body: `${rain ? "It's raining outside!" : "Weather is clear now."}`,
    },
  };

  try {
    await admin.messaging().send(message);
    logger.log(`Weather notification sent to user ${userId}`);
  } catch (error) {
    logger.error(`Error sending to user ${userId}:`, error);
  }
};
