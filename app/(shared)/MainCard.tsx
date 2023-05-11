import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const MainCard = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "bg-foreground col-span-1 row-span-1 rounded-3xl flex flex-col justify-right gap-y-1 p-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MainCard;
