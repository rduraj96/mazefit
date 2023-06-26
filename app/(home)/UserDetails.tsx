"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "../Context/store";
import { Triangle } from "lucide-react";

type Props = {};

const UserDetails = (props: Props) => {
  const { data: session } = useSession();
  const { userDetails } = useGlobalContext();
  const [color, setColor] = useState("");

  function hexToHSL(H: string) {
    // Convert hex to RGB first
    let r = "",
      g = "",
      b = "";
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    let r1 = Number(r);
    r1 /= 255;
    let g1 = Number(g);
    g1 /= 255;
    let b1 = Number(b);
    b1 /= 255;
    let cmin = Math.min(r1, g1, b1),
      cmax = Math.max(r1, g1, b1),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r1) h = ((g1 - b1) / delta) % 6;
    else if (cmax == g1) h = (b1 - r1) / delta + 2;
    else h = (r1 - g1) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  const changeBackgroundColor = (hex: string) => {
    let newColor = hexToHSL(hex);
    console.log(newColor);
    document.documentElement.style.setProperty("--accent", newColor);
  };

  return (
    <section className="h-full grid grid-auto-fit-lg w-full rounded-xl px-4 py-2 gap-4 border">
      <div className="h-full p-2 gap-2">
        <h1 className="text-orange-400 text-2xl font-bold tracking-tight">
          <span className="text-foreground/30 text-sm mr-2">Pace</span>
          Moderate
        </h1>
      </div>
      <div className="h-full p-2 flex gap-2">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Starting Weight
          </span>
          185
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
        </h1>
      </div>
      <div className="h-full p-2 flex text-center gap-2">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">Goal Weight</span>
          170
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
        </h1>
      </div>
      <div className="h-full p-2 flex text-center gap-2">
        <h1 className="text-foreground text-2xl font-bold">
          <span className="text-foreground/30 text-sm mr-2">
            Current Weight
          </span>
          180
          <span className="inline-flex text-foreground/70 text-sm ml-1">
            lb
          </span>
          <span className="text-green-400 inline-flex text-xs gap-2 ml-2">
            +12%
            <Triangle size={12} className="rotate-180" />
          </span>
          {/* <span className="text-red-300 inline-flex text-xs gap-2">
            12%
            <Triangle size={12} />
          </span> */}
        </h1>
      </div>
    </section>
  );
};

export default UserDetails;
