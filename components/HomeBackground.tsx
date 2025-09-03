import React from "react";
import Image from "next/image";

export function HomeBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <Image
        src="/Monakho_PhotoGrid (1) (1).png"
        alt="Monakho Ministry Worship Background"
        fill
        className="object-cover opacity-20"
        priority
      />
    </>
  );
}
