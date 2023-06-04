import React, { useEffect, useState } from "react";
import MainCard from "./MainCard";
import BoxHeader from "./BoxHeader";
import { cn, getPercentage } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useGlobalContext } from "../Context/store";
import { AiFillFire } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
  header: string;
  className?: string;
  macro: number;
};

const MacroCard = ({ children, header, className, macro }: Props) => {
  const { macroGoals } = useGlobalContext();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    let percentage = getPercentage(
      macro,
      macroGoals[header.toLowerCase() as keyof typeof macroGoals]
    );
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [macro]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainCard
      className={cn(
        "group relative transition duration-300 hover:scale-110 ease-in-out hover:-translate-y-2 col-span-1 row-span-2",
        className
      )}
    >
      <BoxHeader className="group-hover:text-opacity-60">{header}</BoxHeader>
      <h1 className="absolute group-hover:-translate-x-16 bottom-5 right-5 transition-all duration-300 ease-in-out text-3xl font-bold text-[#FFA600] group-hover:text-white">
        {macro}
      </h1>
      <h1 className="absolute invisible group-hover:visible bottom-5 right-5 transition-all group-hover:delay-350 ease-in-out text-lg font-bold text-black">
        / {macroGoals[header.toLowerCase() as keyof typeof macroGoals]}
      </h1>
      <Progress
        value={progress}
        className="hidden group-hover:block ease-in-out group-hover:delay-300 duration-300 mt-2"
      />
      {/* <AiFillFire
        size={"10rem"}
        className="rotate-20 text-neutral-800 opac absolute bottom-0 left-0 group-hover:invisible"
      /> */}
    </MainCard>
  );
};

export default MacroCard;
