import Navbar from "@/components/navigation/navbar";
import Sidebar from "@/components/navigation/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary-200 relative">
      <Navbar admin />

      <div className="flex">
        <Sidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pt-24 pb-6 max-md:pb-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;
