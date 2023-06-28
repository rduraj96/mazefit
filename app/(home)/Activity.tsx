import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  Label,
  ReferenceLine,
} from "recharts";
import { ActivityData } from "../types";
import { useGlobalContext } from "../Context/store";
import CustomTooltip from "../(shared)/ActivityCustomTooltip";

type Flags = {
  protein: boolean;
  carbs: boolean;
  fat: boolean;
};

type Props = {
  activityData: Array<ActivityData>;
  flags: Flags;
};

const Activity = ({ activityData, flags }: Props) => {
  const { macroGoals, setSelectedDate } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(6);
  const duration = 1000;
  const handleClick = (date: string, index: number) => {
    setSelectedDate(new Date(date));
    setActiveIndex(index);
  };

  const newData = activityData.map((activity) => {
    let adjustecCalories = activity.calories;

    if (flags.protein) {
      adjustecCalories -= activity.protein;
    }
    if (flags.carbs) {
      adjustecCalories -= activity.carbs;
    }
    if (flags.fat) {
      adjustecCalories -= activity.fat;
    }

    return {
      ...activity,
      calories: adjustecCalories,
    };
  });

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      // className="bg-foreground rounded-3xl"
    >
      <BarChart
        data={newData}
        barCategoryGap={"5%"}
        barSize={20}
        margin={{
          top: 0,
          right: 0,
          left: -15,
          bottom: 0,
        }}
        style={{ stroke: "hsl(var(--card))", strokeWidth: 2 }}
      >
        <defs>
          <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFA600" stopOpacity={1} />
            <stop offset="95%" stopColor="#FFA600" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="colorDataOver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F46082" stopOpacity={1} />
            <stop offset="95%" stopColor="#F46082" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a8bbd1" stopOpacity={1} />
            <stop offset="95%" stopColor="#a8bbd1" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={"formattedDay"}
          style={{ fontSize: "12px" }}
          axisLine={false}
          tickLine={false}
          padding={{ left: 15, right: 15 }}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          style={{ fontSize: "12px" }}
          domain={[0, "auto"]}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          padding={{ top: 15, bottom: 15 }}
        />
        <ReferenceLine
          y={macroGoals?.calories}
          // label="Caloric Goal"
          opacity="35"
          stroke="#fff"
          strokeDasharray="2 3"
          strokeOpacity="35%"
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
          // position={{ y: -10 }}
        />
        {activityData.length > 0 && (
          <Bar
            stackId="a"
            dataKey={"calories"}
            // radius={[10, 10, 0, 0]}
            animationDuration={duration}
          >
            {activityData?.map((entry, index) => (
              // eslint-disable-next-line react/jsx-key
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={"hsl(var(--muted))"}
                onClick={() => handleClick(entry.day, index)}
              />
            ))}
          </Bar>
        )}
        {flags.protein && (
          <Bar stackId={"a"} dataKey={"protein"} animationDuration={duration}>
            {activityData?.map((entry, index) => (
              // eslint-disable-next-line react/jsx-key
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={"hsl(var(--protein))"}
                onClick={() => handleClick(entry.day, index)}
              />
            ))}
          </Bar>
        )}
        {flags.carbs && (
          <Bar stackId={"a"} dataKey={"carbs"} animationDuration={duration}>
            {activityData?.map((entry, index) => (
              // eslint-disable-next-line react/jsx-key
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={"hsl(var(--carbs))"}
                onClick={() => handleClick(entry.day, index)}
              />
            ))}
          </Bar>
        )}
        {flags.fat && (
          <Bar stackId={"a"} dataKey={"fat"} animationDuration={duration}>
            {activityData?.map((entry, index) => (
              // eslint-disable-next-line react/jsx-key
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={"hsl(var(--fat))"}
                onClick={() => handleClick(entry.day, index)}
              />
            ))}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Activity;
