"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { dateToString } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const UserDetails = (props: Props) => {
  const { userDetails } = useGlobalContext();
  const [predictedDate, setPredictedDate] = useState("");

  useEffect(() => {
    const pd = userDetails.predictedDate;
    setPredictedDate(dateToString(new Date(pd)));
  }, [userDetails.predictedDate]);

  const PaceTitle = () => (
    <div className="hidden 2xl:block h-full p-2 gap-2 col-span-1">
      {userDetails.pace === "comfortable" && (
        <h1 className="text-green-400 text-2xl font-bold tracking-tight text-center">
          <span className="text-foreground/30 text-sm mr-2">Pace</span>
          Comfortable
        </h1>
      )}
      {userDetails.pace === "moderate" && (
        <h1 className="text-orange-400 text-2xl font-bold tracking-tight text-center">
          <span className="text-foreground/30 text-sm mr-2">Pace</span>
          Moderate
        </h1>
      )}
      {userDetails.pace === "strenuous" && (
        <h1 className="text-red-400 text-2xl font-bold tracking-tight text-center">
          <span className="text-foreground/30 text-sm mr-2">Pace</span>
          Strenuous
        </h1>
      )}
    </div>
  );

  const getDelta = (): string => {
    let delta =
      (Math.abs(userDetails.weight - userDetails.currentWeight) /
        userDetails.currentWeight) *
      100;
    return delta.toFixed(1);
  };

  const WeightDelta = () => (
    <div className="inline-flex text-xs font-bold gap-2 ml-2">
      {userDetails.currentWeight < userDetails.weight && (
        <div className="text-green-700 flex gap-1 justify-center items-center">
          <TrendingDown size={12} />
          {getDelta()}%
        </div>
      )}
      {userDetails.currentWeight === userDetails.weight && (
        <div className="text-foreground/30 flex gap-1 justify-center items-center">
          <Minus size={12} />
          {getDelta()}%
        </div>
      )}
      {userDetails.currentWeight > userDetails.weight && (
        <div className="text-red-400 flex gap-1 justify-center items-center">
          <TrendingUp size={12} />
          {getDelta()}%
        </div>
      )}
    </div>
  );

  if (userDetails.currentWeight === 0 || !userDetails.currentWeight) {
    return <Skeleton className="h-[50px] w-full rounded-lg" />;
  }

  return (
    <section className="h-full mt-4 grid grid-auto-fit-md w-full rounded-xl px-4 py-2 gap-4 border 2xl:border-">
      <div className="h-full p-2 flex gap-2 justify-start">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Current Weight
          </span>
          {userDetails.currentWeight}
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
        </h1>
        <WeightDelta />
      </div>
      <div className="h-full p-2 flex gap-2 justify-start">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">Goal Weight</span>
          {userDetails.goalWeight}
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
        </h1>
      </div>
      <div className="h-full p-2 flex gap-2 justify-start">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Starting Weight
          </span>
          {userDetails.weight}
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
        </h1>
      </div>
      <div className="h-full p-2 flex gap-2 justify-start ">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Predicted Date
          </span>
          {predictedDate}
        </h1>
      </div>
      <PaceTitle />
    </section>
  );
};

export default UserDetails;
