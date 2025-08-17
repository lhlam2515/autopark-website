import SocialAuthForm from "@/components/forms/SocialAuthForm";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-primary-300 flex min-h-screen items-center justify-center px-4 py-10">
      <section className="bg-primary-100 flex min-w-full flex-col gap-6 rounded-lg px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex w-full flex-col items-start">
          <h1 className="text-secondary-500 text-2xl font-semibold">
            Join Auto<span className="text-secondary-100">Park</span>
          </h1>
          <p className="text-secondary-100 text-sm font-normal">
            To get your parking slot
          </p>
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
