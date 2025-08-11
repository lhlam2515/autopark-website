import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  text: string;
}

const StatusIcon = ({ src, alt, text }: Props) => (
  <div className="flex items-center justify-end gap-1.5">
    <Image src={src} alt={alt} width={16} height={16} />
    <p className="text-secondary-100 text-base font-normal">{text}</p>
  </div>
);

export default StatusIcon;
