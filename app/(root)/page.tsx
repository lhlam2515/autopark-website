import { auth } from "@/auth";
import InfoCard from "@/components/cards/InfoCard";
import SlotForm from "@/components/forms/SlotForm";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import { infoCards } from "@/constants/cards";
import ROUTES from "@/constants/routes";
import { getCurrentSession } from "@/lib/actions/session.action";
import Link from "next/link";

export default async function Home() {
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
        {infoCards.map((card, index) => (
          <InfoCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            imgUrl={card.imgUrl}
            button={card?.button}
          >
            <p className="text-secondary-100 text-base font-normal">
              {card.content}
            </p>
          </InfoCard>
        ))}
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
}
