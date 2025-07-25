import Navbar from "@/components/navigation/navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary-300 relative">
      <Navbar />

      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col px-6 pt-24 max-sm:px-0 max-sm:pt-16">
          <div className="h-full w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default UserLayout;
