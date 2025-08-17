"use client";

import React from "react";
import InfoCard from "./InfoCard";
import { useWeatherData } from "@/hooks/useWeatherData";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  CartesianGrid,
  XAxis,
  Bar,
  ComposedChart,
  Line,
  LabelList,
} from "recharts";

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "#ff0000",
  },
  humidity: {
    label: "Humidity",
    color: "#3da9fc",
  },
  rain: {
    label: "Rain",
    color: "#00bfff",
  },
} satisfies ChartConfig;

const WeatherCard = ({ deviceId }: { deviceId: string }) => {
  const weatherData = useWeatherData(deviceId);

  return (
    <InfoCard title="Current Weather" imgUrl="/icons/weather.svg">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-full max-h-[300px] min-h-[200px] w-full"
      >
        <ComposedChart
          accessibilityLayer
          data={weatherData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="temperature"
            type="natural"
            stroke="var(--color-temperature)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-temperature)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
          <Line
            dataKey="humidity"
            type="natural"
            stroke="var(--color-humidity)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-humidity)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
          <Bar dataKey={"rain"} fill="var(--color-rain)" />
          <ChartLegend content={<ChartLegendContent />} />
        </ComposedChart>
      </ChartContainer>
    </InfoCard>
  );
};

export default WeatherCard;
