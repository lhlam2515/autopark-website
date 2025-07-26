import { auth, signOut } from "@/auth";
import InfoCard from "@/components/cards/InfoCard";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import { infoCards } from "@/constants/cards";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const session = await auth();

  console.log("Session:", session);

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
            content={card.content}
            button={card?.button}
          />
        ))}
      </div>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
      <ToolBar
        buttonLabel="Enter your slot ID"
        buttonStyle="bg-primary-500 text-primary-100"
      />
    </div>
  );
}
