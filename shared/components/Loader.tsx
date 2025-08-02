import React from "react";
import { BarLoader } from "react-spinners";
import { silkscreen } from "../fonts";

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="text-center flex flex-col items-center gap-2">
      <p className={`${silkscreen.className} text-violet-400`}>{text}</p>
      <BarLoader color="#8b5cf6" height={5} width={150} />{" "}
    </div>
  );
};
