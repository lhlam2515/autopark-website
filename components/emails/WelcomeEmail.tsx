import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
interface Props {
  name: string;
}

const WelcomeEmail = ({ name }: Props) => {
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
        <Preview>AutoPark Welcome</Preview>
        <Body className="bg-primary-100 font-sans text-base">
          <Container className="bg-white p-45">
            <Heading className="text-primary-400 my-0 text-center leading-8">
              Welcome to <span className="text-secondary-500">Auto</span>
              <span className="text-secondary-100">Park</span>
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Thank you for joining us,{" "}
                  <span className="text-primary-500 font-bold">{name}</span>
                  !{" "}
                </Text>

                <Text className="text-base">
                  Here&apos;s how to get started:
                </Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-10" key={1}>
                <strong className="text-secondary-500">Smart Park-In</strong>{" "}
                Enter your Slot ID and lock your bike in seconds. Let AutoPark
                handle the hardware — you&apos;re in control.
              </li>
              <li className="mb-10" key={2}>
                <strong className="text-secondary-500">SafePay Unlock</strong>{" "}
                Pay for your parking time directly in the app. Once done, your
                slot unlocks automatically — no delays.
              </li>
              <li className="mb-10" key={3}>
                <strong className="text-secondary-500">Weather Watch</strong>{" "}
                Live updates on rain, temperature, and humidity at your parking
                spot. Stay informed before heading out.
              </li>
            </ul>

            <Section className="text-center">
              <Button className="bg-primary-500 text-primary-100 rounded-lg px-[18px] py-3">
                Go to your dashboard
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
