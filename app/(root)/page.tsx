import { auth } from "@/auth";
import InfoCard from "@/components/cards/InfoCard";
import SlotForm from "@/components/forms/SlotForm";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getCurrentSession } from "@/lib/actions/session.action";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  let isParking = false;
  if (session && session.user) {
    const { success, data } = await getCurrentSession({
      userId: session.user.id as string,
    });

    isParking = success && Boolean(data?.session);
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <section className="mt-2.5 flex w-full flex-col items-start justify-center px-2">
        <h1 className="text-primary-400 text-5xl font-bold">
          Welcome to <span className="text-secondary-500">Auto</span>
          <span className="text-secondary-100">Park</span>!
        </h1>

        <p className="text-secondary-100 text-3xl font-normal">
          Smart Parking Made Easy
        </p>
      </section>

      <div className="flex w-full grow-1 flex-col items-center gap-3 px-3 py-2">
        <InfoCard
          title="Smart Park-In"
          imgUrl="/icons/vehicle.svg"
          subtitle="Park securely with one tap"
        >
          <p className="text-secondary-100 text-base font-normal">
            Enter your Slot ID and lock your bike in seconds. Let AutoPark
            handle the hardware — you&apos;re in control.
          </p>
        </InfoCard>
        <InfoCard
          title="SafePay Unlock"
          imgUrl="/icons/payment.svg"
          subtitle="Unlock after secure payment"
        >
          <p className="text-secondary-100 text-base font-normal">
            Pay for your parking time directly in the app. Once done, your slot
            unlocks automatically — no delays.
          </p>
        </InfoCard>
        <InfoCard
          title="Weather Watch"
          imgUrl="/icons/weather.svg"
          subtitle="Know before you go"
        >
          <p className="text-secondary-100 text-base font-normal">
            Live updates on rain, temperature, and humidity at your parking
            spot. Stay informed before heading out.
          </p>
        </InfoCard>
      </div>

      <ToolBar>
        {isParking ? (
          <Button
            asChild
            className="bg-primary-500 text-primary-100 grow p-2 text-base font-bold"
          >
            <Link href={ROUTES.PARKING_SESSION}>Go to Parking Session</Link>
          </Button>
        ) : (
          <SlotForm />
        )}
      </ToolBar>
    </div>
  );
};

export default Home;
