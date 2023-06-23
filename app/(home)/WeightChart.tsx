import React, { useEffect, useState } from "react";
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
import { dateToString } from "@/lib/utils";
import { time } from "console";
import { WeightData } from "../types";
import { GiWeightScale } from "react-icons/gi";
import { useGlobalContext } from "../Context/store";
import LoadingSpinner from "../(shared)/LoadingSpinner";

type Props = {
  range: string;
};

const WeightChart = ({ range }: Props) => {
  const { selectedDate } = useGlobalContext();
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  // const [weeklyTicks, setWeeklyTicks] = useState<Array<number>>([]);
  // const [monthlyTicks, setMonthlyTicks] = useState<Array<number>>([]);
  const [ticks, setTicks] = useState<Array<number>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/weight?range=${range}&day=${dateToString(selectedDate as Date)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          setWeightData(data);
          let ticks = getTicks(data[data.length - 1].day, range);
          // let monthTicks = getTicks(data[data.length - 1].day, "month");
          // setWeeklyTicks(weekTicks);
          // setMonthlyTicks(monthTicks);
          setTicks(ticks);
        }
        setLoading(false);
      });
  }, [range]);
  0;

  const getTicks = (latestEntry: number, selectedRange: string) => {
    const ticks = [];
    const DAY_IN_MS = 24 * 60 * 60 * 1000;

    if (selectedRange === "week") {
      for (let i = 6; i >= 0; i--) {
        const tickDate = new Date(latestEntry - i * DAY_IN_MS);
        ticks.push(tickDate.getTime());
      }
    } else if (selectedRange === "month") {
      for (let i = 30; i >= 0; i--) {
        const tickDate = new Date(latestEntry - i * DAY_IN_MS);
        ticks.push(tickDate.getTime());
      }
    }

    return ticks;
  };

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    if (range === "week") {
      return date.toLocaleString(window.navigator.language, {
        weekday: "short",
      });
    } else {
      return dateToString(new Date(tickItem)).slice(0, -5);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      {weightData.length > 0 ? (
        <LineChart
          width={300}
          height={100}
          data={weightData}
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
          {weightData.length > 0 && (
            <Line
              type="monotone"
              dataKey="weight"
              stroke="url(#colorUv)"
              strokeWidth={4}
              isAnimationActive={false}
              // animationDuration={duration}
            />
          )}

          <XAxis
            dataKey="day"
            type="number"
            style={{ fontSize: "12px" }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 20, right: 20 }}
            domain={["dataMax - 604800000", "auto"]}
            tickFormatter={formatXAxis}
            // ticks={range === "week" ? weeklyTicks : monthlyTicks}
            ticks={ticks}
            scale={"time"}
            // tickCount={7}
            // interval={0}
          />
          <YAxis
            style={{ fontSize: "12px" }}
            axisLine={false}
            tickLine={false}
            domain={["dataMin - 20", "auto"]}
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <div className="text-neutral-400 flex items-center justify-center h-full">
          <p>
            Click{" "}
            <span className="inline-flex bg-background rounded-lg p-1">
              <GiWeightScale />
            </span>{" "}
            to start tracking your weight.
          </p>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default WeightChart;
