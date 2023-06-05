import React from "react";
import SuplementRow from "../(shared)/SuplementRow";
import { AiOutlinePlus } from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {};

const SuplementList = (props: Props) => {
  return (
    <div className="relative h-full">
      <ScrollArea className="h-full">
        <SuplementRow>Vitamin D</SuplementRow>
        <SuplementRow>Fish Oil</SuplementRow>
        <SuplementRow>Fish Oil</SuplementRow>
        <SuplementRow>Fish Oil</SuplementRow>
        <SuplementRow>Fish Oil</SuplementRow>
        <SuplementRow>Fish Oil</SuplementRow>
        <SuplementRow>Fish Oil</SuplementRow>
      </ScrollArea>
      <div className="absolute bottom-0 flex items-center justify-center min-h-14 w-full bg-[#a8bbd1] rounded-lg p-2 mt-1">
        <AiOutlinePlus size={14} className="text-black" />
      </div>
    </div>
  );
};

export default SuplementList;
