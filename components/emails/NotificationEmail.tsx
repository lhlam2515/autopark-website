import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
interface Props {
  name: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  slotID: string;
}

const NotificationEmail = ({
  name,
  checkInTime,
  checkOutTime,
  location,
  slotID,
}: Props) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                primary: {
                  100: "#fffffe",
                  300: "#d8eefe",
                  400: "#90b4ce",
                  500: "#3da9fc",
                },
                secondary: {
                  100: "#5f6c7b",
                  500: "#094067",
                },
              },
            },
          },
        }}
      >
        <Preview>AutoPark Notification</Preview>
        <Body className="bg-primary-100 font-sans text-base">
          <Container className="bg-white p-45">
            <Heading className="text-primary-400 my-0 text-center leading-8">
              Thanks <span className="text-primary-500 font-bold">{name}</span>{" "}
              for using <span className="text-secondary-500">Auto</span>
              <span className="text-secondary-100">Park</span>
            </Heading>
            <Section>
              <Text className="text-base">
                Here&apos;s your parking session information:
              </Text>
            </Section>
            <ul>
              <li className="mb-5 text-lg">
                <strong className="text-secondary-500">Check-in Time:</strong>{" "}
                {checkInTime}
              </li>
              <li className="mb-5 text-lg">
                <strong className="text-secondary-500">Check-out Time:</strong>{" "}
                {checkOutTime}
              </li>
              <li className="mb-5 text-lg">
                <strong className="text-secondary-500">Location:</strong>{" "}
                {location}
              </li>
              <li className="mb-5 text-lg">
                <strong className="text-secondary-500">Slot ID:</strong>{" "}
                {slotID}
              </li>
            </ul>
            <Section className="bg-primary-500 text-primary-100 px-[18px] py-3 text-center">
              <Text className="text-lg font-bold">
                Thank you for choosing AutoPark!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NotificationEmail;
