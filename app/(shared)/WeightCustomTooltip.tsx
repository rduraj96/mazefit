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
          {`${new Date(label).toLocaleDateString()}`}{" "}
          <span className="text-xs inline-flex">{`${new Date(
            label
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</span>
        </p>

        <p className="text-card-foreground font-bold text-md mt-1">{`${payload?.[0].value} lb`}</p>
        {/* <p>Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
