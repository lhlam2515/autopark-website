import React from "react";
import Link from "next/link";

import InfoCard from "@/components/cards/InfoCard";
import HistoryItem from "@/components/HistoryItem";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Entry from "@/components/Entry";
import { formatCurrency, formatDuration } from "@/lib/utils";

const summary = {
  totalSessions: 0,
  totalSpent: 0,
  averageDuration: 0,
};

const history: HistoryEntry[] = [
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },

  {
    slotId: "S25-1",
    checkInTime: new Date("2023-10-01T08:00:00Z"),
    checkOutTime: new Date("2023-10-01T09:00:00Z"),
    fee: 1000,
    paymentStatus: "paid",
  },
];

const HistoryPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <section className="mt-2.5 flex w-full flex-col items-start justify-center px-2">
        <h1 className="text-primary-400 text-5xl font-bold tracking-tight">
          Your <span className="text-secondary-500">Parking History</span>
        </h1>

        <p className="text-secondary-100 text-3xl font-normal">
          View usage statistics and past sessions.
        </p>
      </section>

      <div className="flex w-full grow-1 flex-col items-center gap-3 overflow-y-auto px-3 py-2">
        <InfoCard
          title="Usage Summary"
          imgUrl="/icons/summary.svg"
          className="flex-0"
        >
          <div className="flex w-full flex-col gap-2.5 px-4">
            <Entry label="Total Sessions">
              <p className="text-secondary-100 text-base font-normal">
                {summary.totalSessions}
              </p>
            </Entry>
            <Entry label="Total Spent">
              <p className="text-secondary-100 text-base font-normal">
                {formatCurrency(summary.totalSpent)}
              </p>
            </Entry>
            <Entry label="Average Duration">
              <p className="text-secondary-100 text-base font-normal">
                {formatDuration(summary.averageDuration)}
              </p>
            </Entry>
          </div>
        </InfoCard>
        <div className="w-full flex-1 overflow-hidden">
          <InfoCard
            title="Recent Parking Sessions"
            imgUrl="/icons/calendar.svg"
            className="h-full"
          >
            <div className="flex w-full flex-col gap-2.5 px-4">
              {history.map((entry, index) => (
                <HistoryItem key={index} entry={entry} />
              ))}
            </div>
          </InfoCard>
        </div>
      </div>

      <ToolBar>
        <Button asChild className="bg-primary-500 text-primary-100 grow p-2">
          <Link href={ROUTES.HOME}>Home</Link>
        </Button>
      </ToolBar>
    </div>
  );
};

export default HistoryPage;
