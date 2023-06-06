import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  children: React.ReactNode;
};

const SuplementRow = ({ children }: Props) => {
  return (
    <div className="h-8 w-full flex items-center justify-start gap-3 p-2">
      <Checkbox />
      <div className="text-black text-md">{children}</div>
    </div>
  );
};

export default SuplementRow;
