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
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [macro, header, macroGoals]);

  return (
    <MainCard
      className={cn(
        "group relative transition duration-300 hover:scale-110 ease-in-out hover:-translate-y-2",
        className
      )}
    >
      <BoxHeader className="mb-0">{header}</BoxHeader>
      <div className="">
        <Progress
          value={progress}
          className="absolute h-2 top-0 left-0 w-full rounded-xl transition-all overflow-clip
          group-hover:w-[90%] group-hover:translate-y-14 group-hover:bg-white group-hover:bg-opacity-30
          group-hover:translate-x-4 group-hover:inline ease-in-out duration-300 group-hover:h-4"
        />
      </div>
      <div className="relative flex justify-between h-full w-full">
        <div className="w-1/2 text-transparent invisible group-hover:visible transition-all group-hover:translate-x-full group-hover:delay-0 duration:600 ease-in-out text-lg font-bold group-hover:text-white flex items-center justify-center group-hover:justify-end group-hover:px-2">
          / {macroGoals[header.toLowerCase() as keyof typeof macroGoals]}
        </div>
        <div className="w-1/2 flex items-center justify-end group-hover:-translate-x-full group-hover:justify-start transition-all duration-500 ease-in-out">
          <div
            className={cn(
              "w-fit h-fit mt-3 mr-3 p-2 bg-[#FFA600] shadow-sm rounded-xl transition-all duration-500 ease-in-out text-4xl font-extrabold text-foreground group-hover:text-white",
              className?.split(":")[1]
            )}
          >
            {macro}
          </div>
        </div>

        {/* <div className="static rotate-20 text-[#a8bbd1] opacity-40 group-hover:invisible overflow-hidden">
          {children}
        </div> */}
      </div>
    </MainCard>
  );
};

export default MacroCard;
