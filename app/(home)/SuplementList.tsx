"use client";

import React, { useState } from "react";
import SuplementRow from "../(shared)/SuplementRow";
import { AiOutlinePlus } from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {};

type Supplement = {
  name: string;
  taken: boolean;
};

const SuplementList = (props: Props) => {
  const { toast } = useToast();
  const data: Supplement[] = [
    {
      name: "Vitamin A",
      taken: true,
    },
    {
      name: "Vitamin B",
      taken: false,
    },
    {
      name: "Vitamin C",
      taken: true,
    },
    {
      name: "Vitamin D",
      taken: false,
    },
  ];
  const [supplementList, setSupplementList] = useState<Supplement[]>(data);

  const handleSubmit = () => {
    setSupplementList((supplements) => [
      ...supplements,
      {
        name: "New Supp",
        taken: false,
      },
    ]);
    toast({
      description: "New Entry added to suplement list!",
    });
  };

  return (
    <div className="relative h-full">
      <div className="h-48 mb-2">
        <ScrollArea className="h-full px-2">
          {supplementList &&
            supplementList.map((supplement, index) => (
              <div key={index} className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id={supplement.name}
                  checked={supplement.taken}
                  onCheckedChange={(checked) => {
                    setSupplementList(
                      supplementList.map((supp) =>
                        supp.name === supplement.name
                          ? {
                              ...supp,
                              // name: supplement.name,
                              taken: checked as boolean,
                            }
                          : supp
                      )
                    );
                    toast({
                      description: `${
                        supplement.name
                      } value changed from ${!checked} to ${checked}`,
                    });
                  }}
                />
                <Label
                  htmlFor={supplement.name}
                  className="text-md text-black font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {supplement.name}
                </Label>
              </div>
            ))}
        </ScrollArea>
      </div>

      <div
        className="absolute bottom-0 flex shadow-sm items-center justify-center min-h-14 w-full cursor-pointer bg-[#c6ced6] hover:bg-[#a8bbd1] rounded-lg p-2 mt-1"
        onClick={handleSubmit}
      >
        <AiOutlinePlus size={14} className="text-black" />
      </div>
    </div>
  );
};

export default SuplementList;
