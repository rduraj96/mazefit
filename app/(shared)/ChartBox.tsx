import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ChartBox = ({ children, className }: Props) => {
  return <div className={cn("h-72 w-full", className)}>{children}</div>;
};

export default ChartBox;
