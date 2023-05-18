import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Legend,
  LineChart,
  BarChart,
  Bar,
  Cell,
} from "recharts";

type Props = {
  data: Array<{
    name: string;
    protein: number;
    calories: number;
    amt: number;
  }>;
};

const Activity = ({ data }: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="bg-[#1b1b1b] rounded-3xl"
    >
      <BarChart
        width={475}
        height={300}
        data={data}
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
        </defs>
        <defs>
          <linearGradient id="colorDataOver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F46082" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F46082" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" style={{ fontSize: "12px" }} />
        <YAxis style={{ fontSize: "12px" }} />
        <Tooltip
          cursor={{
            // background: "black",
            radius: "10, 10, 0, 0",
          }}
        />
        {/* <Legend /> */}
        {/* <Bar dataKey="protein" stackId="a" fill="#F46082" /> */}
        <Bar stackId="a" dataKey="calories" radius={[10, 10, 0, 0]}>
          {data?.map((entry, index) => (
            // eslint-disable-next-line react/jsx-key
            <Cell
              fill={
                entry.calories > 2300
                  ? "url(#colorDataOver)"
                  : "url(#colorData)"
              }
            />
          ))}
        </Bar>
        {/* <Bar
                dataKey="calories"
                stackId="a"
                fill={
                  parseInt(data.calories, 10) > 2300
                    ? "#F46082"
                    : "url(#colorData)"
                }
              /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Activity;
