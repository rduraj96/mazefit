import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ChartBox = ({ children, className }: Props) => {
  return <div className={cn("h-full w-full", className)}>{children}</div>;
};

export default ChartBox;
