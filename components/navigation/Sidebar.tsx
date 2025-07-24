import React from "react";
import NavLinks from "./navbar/NavLinks";

const Sidebar = () => {
  return (
    <section className="border-secondary-500 bg-primary-100 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-24 max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>
    </section>
  );
};

export default Sidebar;
