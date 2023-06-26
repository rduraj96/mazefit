import React, { useEffect } from "react";
import { cn, getPercentage } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useGlobalContext } from "../Context/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  children?: React.ReactNode;
  header: string;
  className?: string;
  macro: number;
  hoverColor: string;
};

const MacroCard = ({ hoverColor, header, className, macro }: Props) => {
  const { macroGoals } = useGlobalContext();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    let percentage = getPercentage(
      macro,
      macroGoals[header.toLowerCase() as keyof typeof macroGoals]
    );
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [macro, header, macroGoals]);

  return (
    <Card
      className={cn(
        "group relative transition duration-300 hover:scale-110 ease-in-out hover:-translate-y-2 ",
        className,
        hoverColor
      )}
      // title={header}
    >
      <CardHeader>
        <CardTitle>{header}</CardTitle>
      </CardHeader>
      {/* <CardTitle className="mb-0">{header}</CardTitle> */}
      <CardContent>
        <div className="">
          <Progress
            value={progress}
            className="absolute h-2 top-0 left-0 w-full rounded-xl transition-all overflow-clip
          group-hover:w-[85%] group-hover:translate-y-14 group-hover:bg-white group-hover:bg-opacity-30
          group-hover:translate-x-6 group-hover:inline ease-in-out duration-300 group-hover:h-4"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="relative flex bottom-0 h-full w-full">
          <div className="w-1/2 text-transparent invisible group-hover:visible transition-all group-hover:translate-x-full group-hover:delay-0 duration:600 ease-in-out text-lg font-bold group-hover:text-white flex items-center justify-center group-hover:justify-end group-hover:px-2">
            / {macroGoals[header.toLowerCase() as keyof typeof macroGoals]}
          </div>
          <div className="w-1/2 flex items-center justify-end group-hover:-translate-x-full group-hover:justify-start transition-all duration-500 ease-in-out">
            <div
              className={`w-fit h-fit bg-${header.toLowerCase()} p-2 group-hover:p-0 shadow-sm rounded-xl transition-all ease-in-out text-4xl font-extrabold group-hover:ml-0 text-primary-foreground group-hover:text-white`}
            >
              {macro}
            </div>
          </div>

          {/* <div className="static rotate-20 text-[#a8bbd1] opacity-40 group-hover:invisible overflow-hidden">
          {children}
        </div> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MacroCard;
