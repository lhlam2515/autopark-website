import Navbar from "@/components/navigation/navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary-300 relative">
      <Navbar />

      <div className="flex">
        <section className="flex max-h-screen min-h-screen flex-1 flex-col pt-16 pb-16">
          <div className="h-full w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default UserLayout;
