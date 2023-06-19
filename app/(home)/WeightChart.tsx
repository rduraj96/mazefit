import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import CustomTooltip from "../(shared)/CustomTooltip";

type Props = {};

const WeightChart = (props: Props) => {
  const duration = 1000;
  const data = [
    {
      name: "Dec",
      uv: 175,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Jan",
      uv: 180,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 178,
      pv: 2400,
      amt: 2400,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={100}
        data={data}
        margin={{
          top: 10,
          right: 0,
          left: -25,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
            <stop offset="30%" stopColor="#FFA600" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#D45088" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="uv"
          stroke="url(#colorUv)"
          strokeWidth={4}
          animationDuration={duration}
        />
        <XAxis
          dataKey="name"
          style={{ fontSize: "10px" }}
          axisLine={false}
          tickLine={false}
          padding={{ left: 15, right: 15 }}

          // tick={false}
        />
        <YAxis
          style={{ fontSize: "10px" }}
          axisLine={false}
          tickLine={false}
          domain={["dataMin - 20", "auto"]}
          padding={{ top: 15, bottom: 15 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightChart;
