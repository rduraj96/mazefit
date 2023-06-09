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
  //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainCard
      className={cn(
        "group relative transition duration-300 hover:scale-110 ease-in-out hover:-translate-y-2 col-span-1 row-span-2",
        className
      )}
    >
      <BoxHeader className="mb-0">{header}</BoxHeader>
      <div className="">
        <Progress
          value={progress}
          className="absolute h-2 top-0 left-0 w-full rounded-xl transition-all 
          group-hover:w-[80%] group-hover:translate-y-16 group-hover:bg-white group-hover:bg-opacity-30
          group-hover:translate-x-5 group-hover:inline ease-in-out duration-300 group-hover:h-4"
        />
      </div>

      <h1
        className={cn(
          "absollute w-fit mt-3 p-2 bg-[#FFA600] shadow-sm rounded-xl transition-all duration-500 ease-in-out text-4xl font-bold text-foreground group-hover:text-white",
          className?.split(":")[1]
        )}
      >
        {macro}
      </h1>
      <h1 className="absolute w-full text-transparent invisible group-hover:visible bottom-5 left-5 transition-all group-hover:translate-x-1/2 group-hover:delay-0 duration:300 ease-in-out text-lg font-bold group-hover:text-black">
        / {macroGoals[header.toLowerCase() as keyof typeof macroGoals]}
      </h1>

      <div className="rotate-20 text-[#a8bbd1] opacity-40 absolute bottom-2 right-2 group-hover:invisible">
        {children}
      </div>
    </MainCard>
  );
};

export default MacroCard;
