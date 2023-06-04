import React from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const MainCard = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "bg-foreground rounded-xl flex flex-col justify-right gap-y-1 p-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MainCard;
