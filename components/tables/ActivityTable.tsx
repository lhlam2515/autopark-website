import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activities = [
  {
    slot: "INV001",
    action: "Paid",
    time: "2023-10-01 12:00",
    performedBy: "Admin",
  },
  {
    slot: "INV002",
    action: "Reserved",
    time: "2023-10-01 12:05",
    performedBy: "User123",
  },
  {
    slot: "INV003",
    action: "Cancelled",
    time: "2023-10-01 12:10",
    performedBy: "Admin",
  },
  {
    slot: "INV003",
    action: "Cancelled",
    time: "2023-10-01 12:10",
    performedBy: "Admin",
  },
  {
    slot: "INV003",
    action: "Cancelled",
    time: "2023-10-01 12:10",
    performedBy: "Admin",
  },
];

const ActivityTable = () => {
  const headers = ["Slot", "Action", "Time", "Performed by"];

  return (
    <div className="border-secondary-500 bg-primary-100 w-full rounded-xl border-2 px-4 pt-4 pb-2">
      <h2 className="text-secondary-500 mb-2 text-3xl font-semibold">
        System Activity
      </h2>
      <Table>
        <TableHeader className="border-secondary-500 border-b-2">
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="text-secondary-500 text-lg font-medium"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <TableRow key={index} className="border-secondary-500">
              {Object.values(activity).map((value, idx) => (
                <TableCell key={idx} className="text-secondary-500">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActivityTable;
