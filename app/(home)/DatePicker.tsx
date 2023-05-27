"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { AiOutlineDown } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";

export function CalendarDatePicker() {
  const today = Date.now();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { selectedDate, setSelectedDate } = useGlobalContext();

  useEffect(() => {
    const formattedDate = date?.toISOString().split("T")[0];
    setSelectedDate(formattedDate as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild className="text-gray-400 hover:text-white">
        <Button
          variant={"custom"}
          className={cn(
            "w-[190px] justify-start text-left font-normal text-sm p-0",
            !date && "text-gray-400"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : format(today, "PPP")}
          <AiOutlineDown className="ml-4 relative right-0" size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus={true}
        />
      </PopoverContent>
    </Popover>
  );
}
