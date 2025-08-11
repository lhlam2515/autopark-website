import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/lib/firebase";

interface WeatherEntry {
  timestamp: string; // formatted for chart
  temperature: number;
  humidity: number;
  rain: boolean;
}

export function useWeatherData(deviceId: string) {
  const [data, setData] = useState<WeatherEntry[]>([]);

  useEffect(() => {
    if (!deviceId) return;

    const weatherRef = ref(database, `/devices/${deviceId}/weather`);

    const unsubscribe = onValue(weatherRef, (snapshot) => {
      const raw = snapshot.val();
      if (!raw) {
        setData([]);
        return;
      }

      // Convert to array sorted by timestamp
      const formatted = Object.entries<WeatherEntry>(raw)
        .map(([, entry]: [string, WeatherEntry]) => ({
          timestamp: new Date(entry.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24-hour format
          }),
          temperature: entry.temperature,
          humidity: entry.humidity,
          rain: Boolean(entry.rain),
        }))
        .filter((_, index) => index % 5 === 0)
        .sort((a, b) =>
          a.timestamp.localeCompare(b.timestamp, undefined, { numeric: true })
        )
        .slice(-10); // Keep only the last 10 entries for performance

      setData(formatted);
    });

    // Cleanup on unmount
    return () => off(weatherRef, "value", unsubscribe);
  }, [deviceId]);

  return data;
}
