import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center animate-spin">
      <Loader2 color="background" />
    </div>
  );
};

export default LoadingSpinner;
