import React from "react";
import Image from "next/image";
import { cn, formatCurrency, formatDate, formatTimeBetween } from "@/lib/utils";
import { Badge } from "./ui/badge";

const HistoryItem = ({ entry }: { entry: HistoryEntry }) => {
  return (
    <div className="border-primary-300 flex flex-col border-b-2 pb-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Image
            src="/icons/location.svg"
            alt="Slot Id"
            width={18}
            height={18}
          />
          <p className="text-secondary-500 text-base font-normal">
            {entry.slotId}
          </p>
        </div>
        <Badge
          className={cn(
            "text-primary-100 px-3",
            entry.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
          )}
        >
          {entry.paymentStatus.charAt(0).toUpperCase() +
            entry.paymentStatus.slice(1)}
        </Badge>
      </div>
      <div className="flex items-center gap-12">
        <p className="text-secondary-500 text-base font-normal">
          {formatDate(entry.checkInTime, true)}
        </p>
        {entry.checkOutTime ? (
          <p className="text-secondary-500 text-base font-normal">
            {formatTimeBetween(entry.checkInTime, entry.checkOutTime)}
          </p>
        ) : (
          <p className="text-secondary-500 text-base font-normal">
            {formatTimeBetween(entry.checkInTime, new Date())}
          </p>
        )}

        <p className="text-secondary-500 text-base font-normal">
          {entry.fee ? formatCurrency(entry.fee) : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default HistoryItem;
