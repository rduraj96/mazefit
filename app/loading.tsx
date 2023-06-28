import React from "react";
import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center text-neutral-400">
      <Spinner width={27} height={28} />
      <h1 className="text-muted-foreground">Loading Dashboard...</h1>
    </div>
  );
}
