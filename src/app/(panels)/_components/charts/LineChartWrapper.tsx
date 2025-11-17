"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartWrapperProps {
  title: string;
  data: unknown[];
  xKey: string;
  dataKeys: { key: string; color?: string }[];
  height?: number;
}

const LineChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  data,
  xKey,
  dataKeys,
  height = 300,
}) => {
  return (
    <div className="w-full bg-accent/20 p-4 rounded-2xl">
      <h3 className="mb-3 font-bold text-lg">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((item, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={item.key}
              stroke={item.color || "#8884d8"}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartWrapper;
