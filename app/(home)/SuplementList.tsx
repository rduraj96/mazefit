"use client";

import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import BoxHeader from "../(shared)/BoxHeader";
import { useGlobalContext } from "../Context/store";
import { Supplements } from "../types";
import { dateToString } from "@/lib/utils";

type Props = {};

const SuplementList = (props: Props) => {
  const { toast } = useToast();
  const { selectedDate, supplements, setSupplements } = useGlobalContext();
  const [daySupplements, setDaySupplements] = useState<Supplements[]>([]);
  const [newSupp, setNewSupp] = useState("");
  const [isNewSupp, setIsNewSupp] = useState(false);

  const formatDate = (date: string): string => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  useEffect(() => {
    const trasformedArray = supplements
      .filter((supplement) => {
        return supplement.supplementLogs.some(
          (log) =>
            dateToString(new Date(log.day)) ===
            dateToString(selectedDate as Date)
        );
      })
      .map((supplement) => {
        const log = supplement.supplementLogs.find((log) => {
          log.day.split("T")[0] === selectedDate?.toISOString().split("T")[0];
          console.log(
            formatDate(log.day),
            "<===>",
            dateToString(selectedDate as Date)
          );
        });

        return {
          supplementId: supplement.id,
          name: supplement.name,
          supplementLogsId: log?.id,
          isTake: log?.isTaken,
        };
      });

    console.log("Transformed Array:", trasformedArray);
  }, [selectedDate, supplements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/supplements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSupp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("New Supplement Added: ", data);
        setSupplements((supplements) => [...supplements, data]);
        setIsNewSupp(false);
        setNewSupp("");
        toast({
          description: `${newSupp} added to suplement list!`,
        });
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const handleDelete = async (supplementId: number) => {
    const response = await fetch(`/api/supplements/${supplementId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSupplements(
      supplements.filter((supplement, i) => supplement.id !== supplementId)
    );
    const data = await response.json();
    console.log(data);
    toast({
      description: `Supplement removed from supplement list`,
    });
  };

  const handleUpdate = async (supplementId: number, checked: boolean) => {
    const response = await fetch(`/api/supplements/${supplementId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taken: checked,
      }),
    });

    const data = await response.json();
    console.log(data);

    setSupplements(
      supplements.map((supplement) =>
        supplementId === supplement.id
          ? { ...supplement, taken: checked }
          : supplement
      )
    );
  };

  return (
    <div className="relative h-full">
      <div className="h-48 mb-2">
        <ScrollArea className="h-full px-2">
          {supplements &&
            supplements.map((supplement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 mb-3 group"
              >
                <Checkbox
                  id={supplement.name}
                  // checked={supplement.taken}
                  // onCheckedChange={(checked) =>
                  //   handleUpdate(supplement.id, checked as boolean)
                  // }
                />
                <Label
                  htmlFor={supplement.name}
                  className="text-md text-black font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {supplement.name}
                </Label>
                <div
                  className="invisible absolute right-2 group-hover:visible"
                  onClick={() => handleDelete(supplement.id)}
                >
                  <TiDelete className="text-[#a8bbd1]" />
                </div>
              </div>
            ))}
        </ScrollArea>
      </div>

      <div className="absoute bottom-2 w-full h-10 flex items-center justify-center cursor-pointer bg-[#c6ced6] hover:bg-[#a8bbd1] rounded-lg mt-1">
        {!isNewSupp ? (
          <div
            className="flex shadow-sm items-center justify-center h-ful w-full"
            onClick={() => setIsNewSupp(true)}
          >
            <AiOutlinePlus size={14} className="text-black" />
          </div>
        ) : (
          <form className="w-full h-fit" onSubmit={handleSubmit}>
            <Input
              id="vitaminName"
              type="text"
              value={newSupp}
              placeholder="Add new supplement..."
              onBlur={() => setIsNewSupp(false)}
              autoFocus={true}
              className="relative w-full my-0 text-black"
              onChange={(e) => setNewSupp(e.target.value)}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default SuplementList;
