import StatCard from "@/components/cards/StatCard";
import ActivityTable from "@/components/tables/ActivityTable";
import TransactionTable from "@/components/tables/TransactionTable";
import React from "react";

const statCards = [
  {
    title: "Total Users",
    content: "210",
  },
  {
    title: "Total Slots",
    content: "48",
  },
  {
    title: "Active Sessions",
    content: "12",
  },
  {
    title: "Revenue Today",
    content: "190,000 đ",
  },
];

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <section className="bg-primary-300 flex w-full flex-col items-start justify-center gap-3 px-4 py-2">
        <h1 className="text-secondary-500 text-7xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-secondary-500 text-3xl font-normal">
          Monitor the status and activity across the parking system
        </p>
      </section>

      <div className="bg-primary-300 flex flex-col gap-4 p-2">
        {/* Statistic Card */}
        <section className="flex w-full items-center justify-between gap-4">
          {statCards.map((card, index) => (
            <div key={index} className="w-1/4">
              <StatCard title={card.title} content={card.content} />
            </div>
          ))}
        </section>

        {/* Monitoring Tables */}
        <section className="flex w-full items-center justify-between gap-4">
          <ActivityTable />
          <TransactionTable />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
