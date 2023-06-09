"use client";

import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "../Context/store";
import { Supplements, TransformedSupplements } from "../types";

type Props = {};

const SuplementList = (props: Props) => {
  const { toast } = useToast();
  const { selectedDate, supplements, setSupplements } = useGlobalContext();
  const [daySupplements, setDaySupplements] = useState<
    TransformedSupplements[]
  >([]);
  const [newSupp, setNewSupp] = useState("");
  const [isNewSupp, setIsNewSupp] = useState(false);

  useEffect(() => {
    const trasformedArray = supplements.map((supplement) => {
      return {
        name: supplement.name,
        isTaken:
          supplement.supplementLogs && supplement.supplementLogs[0]
            ? supplement.supplementLogs[0].isTaken
            : false,
        id: supplement.id,
        logId:
          supplement.supplementLogs && supplement.supplementLogs[0]
            ? supplement.supplementLogs[0].id
            : 0,
      };
    });
    setDaySupplements(trasformedArray);
  }, [selectedDate, supplements, setSupplements]);

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
        setSupplements((supplements) => [
          ...supplements,
          {
            ...data,
          },
        ]);
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

  const handleDelete = async (supplementId: number, supplementName: string) => {
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
      description: `${supplementName} removed from list!`,
    });
  };

  const handleUpdateExisting = async (
    supplementId: number,
    logId: number,
    checked: boolean
  ) => {
    const response = await fetch(
      `/api/supplements/${supplementId}/logs/${logId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isTaken: checked,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    const updatedArray = supplements.map((supplement) => {
      return {
        ...supplement,
        supplementLogs:
          supplement.id === supplementId ? [data] : supplement.supplementLogs,
      };
    });

    setSupplements(updatedArray);
  };

  const handleUpdateNew = async (supplementId: number) => {
    try {
      const response = await fetch(`/api/supplements/${supplementId}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: selectedDate,
          isTaken: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const updatedArray = supplements.map((supplement) => {
          return {
            ...supplement,
            supplementLogs:
              supplement.id === supplementId
                ? [data]
                : supplement.supplementLogs,
          };
        });

        setSupplements(updatedArray);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="relative h-full">
      <div className="h-48 mb-2">
        <ScrollArea className="h-full px-2">
          {daySupplements &&
            daySupplements.map((supplement, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 mb-3 group transition-transform"
              >
                <Checkbox
                  id={supplement.name}
                  checked={supplement.isTaken}
                  onCheckedChange={(checked) => {
                    supplement.logId === 0
                      ? handleUpdateNew(supplement.id)
                      : handleUpdateExisting(
                          supplement.id,
                          supplement.logId,
                          checked as boolean
                        );
                  }}
                />
                <Label
                  htmlFor={supplement.name}
                  className="text-md text-black font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {supplement.name}
                </Label>
                <div
                  className="invisible absolute right-2 group-hover:visible"
                  onClick={() => handleDelete(supplement.id, supplement.name)}
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
