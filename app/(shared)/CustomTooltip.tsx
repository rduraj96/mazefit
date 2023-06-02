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
      <div className="p-2 bg-transparet border-2 border-orange-300 rounded-lg">
        <p className="text-gray-200 font-semibold">{`${payload?.[0].value}`}</p>
        {/* <p>Anything you want can be displayed here.</p> */}
      </div>
    );
    // console.log("Payload:", payload);
  }

  return null;
};

export default CustomTooltip;
