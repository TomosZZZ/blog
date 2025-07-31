import React from "react";
import { BarLoader } from "react-spinners";
import { silkscreen } from "../fonts";

export const Loader = () => {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      <p className={`${silkscreen.className} text-violet-400 `}>Loading...</p>
      <BarLoader color="#5821b6" height={5} width={150} />
    </div>
  );
};
