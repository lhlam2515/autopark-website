import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface Props {
  title: string;
  subtitle?: string;
  imgUrl?: string;
  children?: React.ReactNode;
  className?: string;
}

const InfoCard = ({ title, subtitle, imgUrl, children, className }: Props) => {
  return (
    <Card
      className={`bg-primary-100 flex w-full flex-1 flex-col items-center gap-3 rounded-xl px-1.5 py-2 shadow-md ${className || ""}`}
    >
      <CardHeader className="flex w-full flex-col items-start gap-0 px-1">
        <div className="flex items-center gap-2">
          {imgUrl && <Image src={imgUrl} alt={title} width={24} height={24} />}
          <CardTitle className="text-secondary-500 text-2xl font-semibold">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="px-6">
          {subtitle && (
            <p className="text-secondary-100 text-sm font-semibold">
              {subtitle}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="custom-scrollbar h-full w-full overflow-y-auto px-1">
        {children}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
