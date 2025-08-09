import React from "react";
import Image from "next/image";
import MobileNav from "./navigation/navbar/MobileNav";
import Link from "next/link";

const ToolBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-300 border-secondary-500 fixed bottom-0 flex w-full items-center justify-between gap-4 border-t p-3">
      <MobileNav tool />
      {children}
      <Link href="/history">
        <Image src="/icons/history.svg" alt="History" width={24} height={24} />
        <span className="sr-only">History</span>
      </Link>
    </div>
  );
};

export default ToolBar;
