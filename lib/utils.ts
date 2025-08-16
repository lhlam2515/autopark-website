import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateOTP = () => {
  // Simple OTP generation logic (for demonstration purposes)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const calculateParkingFee = (duration: number) => {
  const ratePerHour = 500; // Example rate
  const hours = Math.ceil(duration / (60 * 60));
  return hours * ratePerHour + 1000;
};

export const calculateElapsedTime = (startTime: string | Date) => {
  const now = new Date();
  const elapsed = Math.floor(
    (now.getTime() - new Date(startTime).getTime()) / 1000
  );
  return elapsed;
};

export const formatDate = (date: string | Date, compact: boolean = false) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat(undefined, {
    // `undefined` uses user's locale
    year: "numeric",
    month: "short", // "Aug" instead of "August"
    day: "numeric",
    hour: compact ? undefined : "2-digit",
    minute: compact ? undefined : "2-digit",
    second: compact ? undefined : "2-digit",
    hour12: false, // 24-hour format
  }).format(d);
};

export const formatTimeBetween = (startTime: Date, endTime: Date) => {
  const startHour = startTime.getHours().toString().padStart(2, "0");
  const startMinute = startTime.getMinutes().toString().padStart(2, "0");
  const endHour = endTime.getHours().toString().padStart(2, "0");
  const endMinute = endTime.getMinutes().toString().padStart(2, "0");

  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `0m`;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
