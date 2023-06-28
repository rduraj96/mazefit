"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "../Context/store";
import { Minus, TrendingDown, TrendingUp, Triangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { dateToString } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const UserDetails = (props: Props) => {
  const { userDetails } = useGlobalContext();
  const [predictedDate, setPredictedDate] = useState("");
  const currentWeight = 212;

  useEffect(() => {
    const pd = userDetails.predictedDate;
    setPredictedDate(dateToString(new Date(pd)));
  }, [userDetails.predictedDate]);

  // function hexToHSL(H: string) {

  //   // Convert hex to RGB first
  //   let r = "",
  //     g = "",
  //     b = "";
  //   if (H.length == 4) {
  //     r = "0x" + H[1] + H[1];
  //     g = "0x" + H[2] + H[2];
  //     b = "0x" + H[3] + H[3];
  //   } else if (H.length == 7) {
  //     r = "0x" + H[1] + H[2];
  //     g = "0x" + H[3] + H[4];
  //     b = "0x" + H[5] + H[6];
  //   }
  //   // Then to HSL
  //   let r1 = Number(r);
  //   r1 /= 255;
  //   let g1 = Number(g);
  //   g1 /= 255;
  //   let b1 = Number(b);
  //   b1 /= 255;
  //   let cmin = Math.min(r1, g1, b1),
  //     cmax = Math.max(r1, g1, b1),
  //     delta = cmax - cmin,
  //     h = 0,
  //     s = 0,
  //     l = 0;

  //   if (delta == 0) h = 0;
  //   else if (cmax == r1) h = ((g1 - b1) / delta) % 6;
  //   else if (cmax == g1) h = (b1 - r1) / delta + 2;
  //   else h = (r1 - g1) / delta + 4;

  //   h = Math.round(h * 60);

  //   if (h < 0) h += 360;

  //   l = (cmax + cmin) / 2;
  //   s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  //   s = +(s * 100).toFixed(1);
  //   l = +(l * 100).toFixed(1);

  //   return "hsl(" + h + "," + s + "%," + l + "%)";
  // }

  // const changeBackgroundColor = (hex: string) => {
  //   let newColor = hexToHSL(hex);
  //   console.log(newColor);
  //   document.documentElement.style.setProperty("--accent", newColor);
  // };

  const PaceTitle = () => (
    <div className="hidden sm:block h-full p-2 gap-2 sm:col-span-2 lg:col-span-1">
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
    let deltta =
      (Math.abs(userDetails.weight - userDetails.currentWeight) /
        userDetails.currentWeight) *
      100;
    return deltta.toFixed(1);
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
    <section className="h-full mt-4 grid grid-auto-fit-md w-full rounded-xl px-4 py-2 gap-4 border">
      <div className="h-full p-2 flex gap-2 justify-start">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Current Weight
          </span>
          {userDetails.currentWeight}
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
          {/* <span className="text-red-300 inline-flex text-xs gap-2">
            12%
            <Triangle size={12} />
          </span> */}
        </h1>
        <WeightDelta />
        {/* <Separator orientation="vertical" /> */}
      </div>
      <div className="h-full p-2 flex gap-2 justify-start">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">Goal Weight</span>
          {userDetails.goalWeight}
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
        </h1>
        {/* <Separator orientation="vertical" /> */}
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
        {/* <Separator orientation="vertical" /> */}
      </div>
      <div className="h-full p-2 flex gap-2 justify-start ">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Predicted Date
          </span>
          {predictedDate}
        </h1>
        {/* <Separator orientation="vertical" /> */}
      </div>
      <PaceTitle />
    </section>
  );
};

export default UserDetails;
