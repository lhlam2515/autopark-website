import Image from "next/image";
import React from "react";

interface Props {
  label: string;
  imgUrl?: string;
  children: React.ReactNode;
}

const Entry = ({ label, imgUrl, children }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-2.5">
      <div className="flex w-full items-center gap-1">
        {imgUrl && <Image src={imgUrl} width={24} height={24} alt={label} />}
        <p className="text-secondary-500 text-base font-bold">{label}</p>
      </div>
      <div className="flex w-full grow-1 justify-end">{children}</div>
    </div>
  );
};

export default Entry;
