import InfoCard from "@/components/cards/InfoCard";
import { infoCards } from "@/constants/cards";

export default function Home() {
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

      <div className="flex w-full flex-col items-center gap-3 px-3 py-2">
        <p className="text-secondary-100 text-lg font-normal">
          Explore the features and functionalities of AutoPark!
        </p>
      </div>
    </div>
  );
}
