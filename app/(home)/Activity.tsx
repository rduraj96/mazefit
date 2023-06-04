import React, { useState } from "react";
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
import CustomTooltip from "../(shared)/CustomTooltip";

type Props = {
  activityData: Array<ActivityData>;
};

const Activity = ({ activityData }: Props) => {
  const { macroGoals, setSelectedDate } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(6);
  const duration = 1000;
  const handleClick = (date: string, index: number) => {
    setSelectedDate(new Date(date));
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      // className="bg-foreground rounded-3xl"
    >
      <BarChart
        // width={475}
        // height={300}
        data={activityData}
        margin={{
          top: 0,
          right: 0,
          left: -15,
          bottom: 0,
        }}
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
          dataKey="day"
          style={{ fontSize: "10px" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          style={{ fontSize: "10px" }}
          domain={[0, "auto"]}
          axisLine={false}
          tickLine={false}
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
            dataKey="calories"
            radius={[10, 10, 0, 0]}
            animationDuration={duration}
            barSize={100}
            // label={{
            //   position: "top",
            //   offset: 15,
            // }}
          >
            {activityData?.map((entry, index) => (
              // eslint-disable-next-line react/jsx-key
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                // onMouseOver={}y
                fill={
                  index === activeIndex ? "url(#colorData)" : "url(#colorHover)"
                }
                // style={{
                //   filter: `drop-shadow(0px 0px 2px #FFA600)`,
                // }}
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
