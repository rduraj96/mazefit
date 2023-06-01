import React, { useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { ActivityData } from "../types";
import { useGlobalContext } from "../Context/store";

type Props = {
  activityData: Array<ActivityData>;
};

const Activity = ({ activityData }: Props) => {
  const { calories, setSelectedDate } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(6);
  const handleClick = (date: string, index: number) => {
    setSelectedDate(new Date(date));
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="bg-foreground rounded-3xl"
    >
      <BarChart
        width={475}
        height={300}
        data={activityData}
        margin={{
          top: 45,
          right: 15,
          left: 0,
          bottom: 15,
        }}
      >
        <defs>
          <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#51D8D8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#51D8D8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDataOver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F46082" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F46082" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#777a7a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#777a7a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" style={{ fontSize: "12px" }} />
        <YAxis style={{ fontSize: "12px" }} domain={[0, calories * 1.25]} />
        <Tooltip
          cursor={{
            fill: "url(#colorHover)",
            radius: 20,
          }}
        />
        {/* <Bar dataKey="protein" stackId="a" fill="#F46082" /> */}
        <Bar stackId="a" dataKey="calories" radius={[10, 10, 0, 0]}>
          {activityData?.map((entry, index) => (
            // eslint-disable-next-line react/jsx-key
            <Cell
              cursor="pointer"
              fill={
                index === activeIndex
                  ? "url(#colorDataOver)"
                  : "url(#colorData)"
              }
              onClick={() => handleClick(entry.day, index)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Activity;
