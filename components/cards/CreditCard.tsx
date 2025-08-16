import React from "react";
import Entry from "../Entry";
import InfoCard from "./InfoCard";

interface Props {
  cardNumber?: string;
  cardExpiry?: string;
}

const CreditCard = ({ cardNumber, cardExpiry }: Props) => {
  return (
    <InfoCard title="Credit Details" imgUrl="/icons/wallet.svg">
      <div className="flex w-full flex-col gap-2.5 px-4">
        <Entry label="Card number" imgUrl="/icons/card.svg">
          <p className="text-secondary-100 text-base font-normal">
            {cardNumber
              ? cardNumber.slice(7).replace(/\d(?=\d{4})/g, "*")
              : "Not provided"}
          </p>
        </Entry>
        <Entry label="Expiry" imgUrl="/icons/clock.svg">
          <p className="text-secondary-100 text-base font-normal">
            {cardExpiry || "Not provided"}
          </p>
        </Entry>
      </div>
    </InfoCard>
  );
};

export default CreditCard;
