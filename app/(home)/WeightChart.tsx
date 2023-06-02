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
      uv: 182,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Feb",
      uv: 185,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Mar",
      uv: 185,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Apr",
      uv: 190,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "May",
      uv: 183,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jun",
      uv: 180,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={100}
        data={data}
        margin={{
          top: 0,
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
          // tick={false}
        />
        <YAxis
          style={{ fontSize: "10px" }}
          axisLine={false}
          tickLine={false}
          domain={["auto", "auto"]}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightChart;
