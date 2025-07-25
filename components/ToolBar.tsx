import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  buttonLabel: string;
  buttonStyle: string;
}

const ToolBar = ({ buttonLabel, buttonStyle }: Props) => {
  return (
    <div className="bg-primary-300 border-secondary-500 fixed bottom-0 flex w-full items-center justify-between gap-4 border-t p-3">
      <Button variant="ghost" className="p-0">
        <Image src="./icons/menu.svg" alt="Menu" width={24} height={24} />
      </Button>
      <Button className={cn(buttonStyle, "hover:bg-primary-400 grow p-2")}>
        {buttonLabel}
      </Button>
      <Button variant="ghost" className="p-0">
        <Image src="./icons/history.svg" alt="History" width={24} height={24} />
      </Button>
    </div>
  );
};

export default ToolBar;
