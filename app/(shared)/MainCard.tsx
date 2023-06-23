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
        "bg-foreground rounded-xl shadow-md flex flex-col justify-right gap-y-1 p-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MainCard;
