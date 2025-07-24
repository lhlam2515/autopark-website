import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    user: "User123",
    slot: "INV001",
    time: "2023-10-01 10:00/12:00",
    fee: "7,000 đ",
  },
  {
    user: "User456",
    slot: "INV002",
    time: "2023-10-01 11:00/13:00",
    fee: "5,000 đ",
  },
  {
    user: "User789",
    slot: "INV003",
    time: "2023-10-01 12:00/14:00",
    fee: "10,000 đ",
  },
  {
    user: "User123",
    slot: "INV004",
    time: "2023-10-01 13:00/15:00",
    fee: "8,000 đ",
  },
  {
    user: "User456",
    slot: "INV005",
    time: "2023-10-01 14:00/16:00",
    fee: "6,000 đ",
  },
];

const TransactionTable = () => {
  const headers = ["User", "Slot", "Time In/Out", "Fee"];

  return (
    <div className="border-secondary-500 bg-primary-100 w-full rounded-xl border-2 px-4 pt-4 pb-2">
      <h2 className="text-secondary-500 mb-2 text-3xl font-semibold">
        Recent Transactions
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
          {transactions.map((activity, index) => (
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

export default TransactionTable;
