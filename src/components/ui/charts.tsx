"use client";

import { useTheme } from "next-themes";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

// recharts用のTooltipプロパティ型を定義
interface TooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
  formatter?: (value: number) => string;
}

// チャートデータの型
interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

// カスタムツールチップ
const CustomTooltip = ({ active, payload, label, formatter }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border border-border rounded-md shadow-md">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm">
            {`${entry.name}: ${formatter ? formatter(entry.value) : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// エリアチャート
export const ModernAreaChart = ({
  data,
  width = "100%",
  height = 300,
  colors = ["#3b82f6", "#8b5cf6"],
  formatter,
  ...props
}: {
  data: ChartData[];
  width?: string | number;
  height?: number;
  colors?: string[];
  formatter?: (value: number) => string;
  [key: string]: any;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        {...props}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors[1]} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke={isDark ? "#94a3b8" : "#64748b"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={isDark ? "#94a3b8" : "#64748b"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatter ? formatter : undefined}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
        />
        <Tooltip content={<CustomTooltip formatter={formatter} />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={colors[0]}
          fillOpacity={1}
          fill="url(#colorGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// ラインチャート
export const ModernLineChart = ({
  data,
  width = "100%",
  height = 300,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  formatter,
  lines = ["value1", "value2"],
  ...props
}: {
  data: ChartData[];
  width?: string | number;
  height?: number;
  colors?: string[];
  formatter?: (value: number) => string;
  lines?: string[];
  [key: string]: any;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        {...props}
      >
        <XAxis
          dataKey="name"
          stroke={isDark ? "#94a3b8" : "#64748b"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={isDark ? "#94a3b8" : "#64748b"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatter}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
        />
        <Tooltip content={<CustomTooltip formatter={formatter} />} />
        {lines.map((line, index) => (
          <Line
            key={line}
            type="monotone"
            dataKey={line}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 0, fill: colors[index % colors.length] }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// 円グラフ
export const ModernPieChart = ({
  data,
  width = "100%",
  height = 300,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"],
  formatter,
  ...props
}: {
  data: ChartData[];
  width?: string | number;
  height?: number;
  colors?: string[];
  formatter?: (value: number) => string;
  [key: string]: any;
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart {...props}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip formatter={formatter} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
