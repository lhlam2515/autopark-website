import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Link } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  imgUrl?: string;
  button?: {
    label: string;
    href?: string;
  };
  children: React.ReactNode;
}

const DataCard = ({ title, imgUrl, button, children }: Props) => {
  return (
    <Card className="bg-primary-100 flex w-full flex-1 flex-col items-center gap-3 rounded-xl px-1.5 py-2 shadow-md">
      <CardHeader className="flex w-full flex-col items-start gap-0 px-1">
        <div className="flex items-center gap-2">
          {imgUrl && <Image src={imgUrl} alt={title} width={24} height={24} />}
          <CardTitle className="text-secondary-500 text-2xl font-semibold">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-full px-1">{children}</CardContent>
      {button && (
        <CardAction className="flex w-full justify-end px-2">
          <Button
            asChild
            className="bg-primary-500 hover:bg-primary-400 flex rounded-lg px-6 py-1"
          >
            {button.href ? (
              <Link href={button.href} className="w-full">
                {button.label}
              </Link>
            ) : (
              <span className="text-primary-100 text-lg font-semibold">
                {button.label}
              </span>
            )}
          </Button>
        </CardAction>
      )}
    </Card>
  );
};

export default DataCard;
