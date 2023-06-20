import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const BoxHeader = ({ className, children }: Props) => {
  return (
    <div className={cn("text-black mb-2", className)}>
      <div className="p-2 font-bold text-xl flex items-center justify-between">
        {children}
      </div>
    </div>
  );
};

export default BoxHeader;
