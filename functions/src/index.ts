import admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onValueUpdated } from "firebase-functions/v2/database";

import { WeatherEntry } from "./types";
import { getTimestamp, sendWeatherToUser } from "./utils";

// Initialize Firebase Admin SDK
admin.initializeApp();

export const sendWeatherNotification = onValueUpdated(
  { ref: "/devices/{deviceId}/weather", region: "asia-southeast1" },
  async (event) => {
    const deviceId = event.params.deviceId;

    const before = event.data.before.val() || {};
    const after = event.data.after.val() || {};

    const afterEntries = Object.values<WeatherEntry>(after);
    if (afterEntries.length === 0) {
      logger.info(`No weather data found for ${deviceId}`);
      return null;
    }

    const latestFilter = (latest: WeatherEntry, current: WeatherEntry) => {
      return getTimestamp(current.timestamp) > getTimestamp(latest.timestamp)
        ? current
        : latest;
    };

    let latestAfter: WeatherEntry = afterEntries.reduce(
      latestFilter,
      {} as WeatherEntry
    );

    const beforeEntries = Object.values<WeatherEntry>(before);
    let latestBefore: WeatherEntry = beforeEntries.reduce(
      latestFilter,
      {} as WeatherEntry
    );

    // Check if rain data has changed
    if (latestBefore.rain === latestAfter.rain) {
      logger.info(`No change in rain data for ${deviceId}`);
      return null;
    }

    logger.info(`New weather for ${deviceId}:`, latestAfter);

    const slotsSnapshot = await admin
      .database()
      .ref(`/devices/${deviceId}/slots`)
      .get();

    const notifications: Promise<void>[] = [];

    slotsSnapshot.forEach((slotSnap) => {
      const slotData = slotSnap.val();
      if (slotData && slotData.userId) {
        notifications.push(
          sendWeatherToUser({
            userId: slotData.userId,
            weatherData: latestAfter,
          })
        );
      }
    });

    return Promise.all(notifications);
  }
);
