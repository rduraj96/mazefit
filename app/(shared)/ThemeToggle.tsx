"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { setTheme, systemTheme } = useTheme();
  const [checked, setChecked] = useState(systemTheme === "dark" ? true : false);

  useEffect(() => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [checked]);

  return (
    <label
      htmlFor="Toggle1"
      className="inline-flex items-center space-x-4 cursor-pointer text-primary mr-3"
    >
      <span className="dark:invisible visible">
        <Sun size={20} />
      </span>
      <span className="relative">
        <input
          id="Toggle1"
          type="checkbox"
          className="hidden peer"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="w-10 h-6 rounded-full bg-muted border"></div>
        <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-primary"></div>
      </span>
      <span className="invisible dark:visible">
        <Moon size={20} />
      </span>
    </label>
  );
}
