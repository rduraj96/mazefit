"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "../Context/store";

export function CalendarDatePicker() {
  const today = Date.now();
  const { selectedDate, setSelectedDate } = useGlobalContext();

  return (
    <Popover>
      <PopoverTrigger asChild className="">
        <Button
          type="button"
          variant={"ghost"}
          // variant={"custom"}
          // className={cn(
          //   "w-[190px] justify-center font-normal text-sm p-0 text-foreground",
          //   !selectedDate && "text-background"
          // )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : format(today, "PPP")}
          <ChevronDown className="ml-2 relative right-0" size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          initialFocus={true}
          required={true}
        />
      </PopoverContent>
    </Popover>
  );
}
