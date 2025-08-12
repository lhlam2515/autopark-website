import React from "react";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import {
  getCurrentSession,
  lockParkingSession,
} from "@/lib/actions/session.action";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SlotCard from "@/components/cards/SlotCard";
import ParkingCard from "@/components/cards/ParkingCard";
import PaymentCard from "@/components/cards/PaymentCard";
import WeatherCard from "@/components/cards/WeatherCard";
import { cn } from "@/lib/utils";
import { database } from "@/lib/firebase";
import { child, ref, set } from "firebase/database";

const ParkingSession = async () => {
  const session = await auth();

  const { success, data } = await getCurrentSession({
    userId: session?.user?.id as string,
  });
  if (!success || !data?.session) {
    redirect(ROUTES.HOME);
  }

  const { slot, ...parkingSession } = data.session;

  const handleLock = async () => {
    "use server";

    const lock = parkingSession.paymentStatus === "unpaid";
    const { success } = await lockParkingSession({
      userId: session?.user?.id as string,
      slotId: slot.slotId,
      lock,
    });

    if (success) {
      const slotIndex = slot.slotId.split("-")[1];
      const slotRef = ref(
        database,
        `/devices/${slot.deviceId}/slots/${slotIndex}`
      );

      await set(child(slotRef, "locked"), lock);

      if (lock) {
        redirect(ROUTES.PARKING_SESSION);
      } else {
        redirect(ROUTES.HOME);
      }
    }

    redirect(ROUTES.PARKING_SESSION);
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <section className="mt-2.5 flex w-full flex-col items-start justify-center px-2">
        <h1 className="text-primary-400 text-5xl font-bold">
          My <span className="text-secondary-500">Parking Session</span>
        </h1>

        <p className="text-secondary-100 text-3xl font-normal">
          Track your current slot, time and payment details
        </p>
      </section>

      <div className="flex w-full grow-1 flex-col items-center gap-3 px-3 py-2">
        <SlotCard
          slotId={slot.slotId}
          location={slot.location}
          locked={parkingSession.locked}
        />
        <WeatherCard deviceId={slot.deviceId} />
        <ParkingCard
          slot={slot}
          checkInTime={parkingSession.checkInTime}
          paid={parkingSession.paymentStatus === "paid"}
        />
        <PaymentCard
          checkInTime={parkingSession.checkInTime}
          paymentStatus={parkingSession.paymentStatus}
        />
      </div>
      <ToolBar>
        {!parkingSession.locked ? (
          <Button
            className="text-primary-100 grow bg-green-500 p-2"
            onClick={handleLock}
          >
            Lock
          </Button>
        ) : (
          <Button
            className={cn(
              "text-primary-100 grow bg-red-500 p-2",
              parkingSession.paymentStatus === "unpaid" &&
                "cursor-not-allowed opacity-50"
            )}
            onClick={
              parkingSession.paymentStatus === "unpaid" ? undefined : handleLock
            }
          >
            Unlock
          </Button>
        )}
      </ToolBar>
    </div>
  );
};

export default ParkingSession;
