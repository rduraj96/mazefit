import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const ChartBox = ({ children, className }: Props) => {
  return <div className={cn("h-64 w-full", className)}>{children}</div>;
};

export default ChartBox;
