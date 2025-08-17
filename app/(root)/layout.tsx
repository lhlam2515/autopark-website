import Navbar from "@/components/navigation/navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary-300 relative">
      <Navbar />

      <div className="flex">
        <section className="flex min-h-dvh flex-1 flex-col pt-16 pb-16 sm:min-h-screen sm:px-14">
          <div className="mx-auto h-full w-full max-w-4xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default UserLayout;
