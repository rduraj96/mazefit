import React from "react";
import { Loader } from "lucide-react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center text-neutral-400">
      <Loader className="animate-spin h-8 w-8" />
      <h1 className="text-lg">Loading Dashboard...</h1>
    </div>
  );
};

export default loading;
