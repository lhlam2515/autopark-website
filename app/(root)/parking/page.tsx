import { auth } from "@/auth";
import InfoCard from "@/components/cards/InfoCard";
import Entry from "@/components/Entry";
import ToolBar from "@/components/ToolBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const slot = {
  slotID: "S-25",
  location: "Zone B, South Entrance",
};

const parkingSession = {
  slot,
  checkInTime: new Date(),
  elapsed: 100,
  fee: 2000,
  locked: false,
  paymentStatus: "unpaid",
};

const weather = {
  temperature: 25,
  humidity: 60,
  rain: false,
};

const StatusIcon = ({
  src,
  alt,
  text,
}: {
  src: string;
  alt: string;
  text: string;
}) => (
  <div className="flex items-center justify-end gap-1.5">
    <Image src={src} alt={alt} width={16} height={16} />
    <p className="text-secondary-100 text-base font-normal">{text}</p>
  </div>
);

const SlotDetailsCard = ({
  slot,
  locked,
}: {
  slot: { slotID: string; location: string };
  locked: boolean;
}) => (
  <InfoCard title="Slot Details" imgUrl="/icons/location.svg">
    <div className="flex w-full flex-col gap-2.5 px-4">
      <Entry label="Slot ID">{slot.slotID}</Entry>
      <Entry label="Location">{slot.location}</Entry>
      <Entry label="Status">
        {locked ? (
          <StatusIcon
            src="/icons/green-circle.svg"
            alt="Locked"
            text="Locked"
          />
        ) : (
          <StatusIcon
            src="/icons/red-circle.svg"
            alt="Unlocked"
            text="Unlocked"
          />
        )}
      </Entry>
    </div>
  </InfoCard>
);

const WeatherCard = ({
  weather,
}: {
  weather: {
    temperature: number;
    humidity: number;
    rain: boolean;
  };
}) => (
  <InfoCard title="Current Weather" imgUrl="/icons/weather.svg">
    <div className="flex w-full flex-col gap-2.5 px-4">
      <Entry label="Temperature">{weather.temperature}°C</Entry>
      <Entry label="Humidity">{weather.humidity}%</Entry>
      <Entry label="Weather">
        {weather.rain ? (
          <StatusIcon src="/icons/rainy.svg" alt="Weather Icon" text="Rainy" />
        ) : (
          <StatusIcon src="/icons/sunny.svg" alt="Weather Icon" text="Sunny" />
        )}
      </Entry>
    </div>
  </InfoCard>
);

const ParkingStatusCard = ({
  checkInTime,
  elapsed,
  fee,
}: {
  checkInTime: Date;
  elapsed: number;
  fee: number;
}) => (
  <InfoCard title="Parking Status" imgUrl="/icons/clock.svg">
    <div className="flex w-full flex-col gap-2.5 px-4">
      <Entry label="Check-in Time">{checkInTime.toLocaleString()}</Entry>
      <Entry label="Elapsed Time">{Math.floor(elapsed / 60)} minutes</Entry>
      <Entry label="Parking Fee">{fee} VNĐ</Entry>
    </div>
  </InfoCard>
);

const PaymentStatusCard = ({
  fee,
  status,
}: {
  fee: number;
  status: "paid" | "unpaid";
}) => (
  <InfoCard title="Payment Status" imgUrl="/icons/payment.svg">
    <div className="flex w-full flex-col gap-2.5 px-4">
      <Entry label="Amount Due">{fee} VNĐ</Entry>
      <Entry label="Status">
        {status === "paid" ? (
          <StatusIcon src="/icons/green-circle.svg" alt="Paid" text="Paid" />
        ) : (
          <StatusIcon
            src="/icons/yellow-circle.svg"
            alt="Unpaid"
            text="Unpaid"
          />
        )}
      </Entry>
    </div>
  </InfoCard>
);

const ParkingSession = async () => {
  const session = await auth();

  console.log("Session:", session);

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
        <SlotDetailsCard slot={slot} locked={parkingSession.locked} />
        <WeatherCard weather={weather} />
        <ParkingStatusCard {...parkingSession} />
        <PaymentStatusCard
          fee={parkingSession.fee}
          status={parkingSession.paymentStatus}
        />
      </div>
      <ToolBar>
        <Button className="text-primary-100 grow bg-green-500 p-2">Lock</Button>
      </ToolBar>
    </div>
  );
};

export default ParkingSession;
