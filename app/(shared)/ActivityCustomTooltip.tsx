import { Separator } from "@/components/ui/separator";
import { dateToString } from "@/lib/utils";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="p-2 border bg-card bg-opacity-50 rounded-lg shadow-sm divide-background divide-y gap-y-4">
        <p className="text-card-foreground font-semibold text-sm mb-1">
          {`${payload?.[0].payload?.day}`}
        </p>
        <p className="text-card-foreground font-bold text-md mt-1">{`${
          Number(payload?.[0].value) +
          Number(payload?.[1].value) +
          Number(payload?.[2].value) +
          Number(payload?.[3].value)
        } cal`}</p>
        <Separator />
        {payload?.[1] && (
          <p className="text-bold text-protein">
            P: <span>{`${Number(payload?.[1].value) / 4}g`}</span>
          </p>
        )}
        {payload?.[2] && (
          <p className="text-bold text-carbs">
            C: <span>{`${Number(payload?.[2].value) / 4}g`}</span>
          </p>
        )}
        {payload?.[3] && (
          <p className="text-bold text-fat">
            F: <span>{`${Number(payload?.[3].value) / 9}g`}</span>
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
