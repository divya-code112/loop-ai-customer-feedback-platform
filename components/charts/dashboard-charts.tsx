"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sentimentData, themeInsights, volumeData } from "@/lib/demo-data";

const sentimentColors = ["#10b981", "#64748b", "#ef4444"];

export function VolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Volume Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={volumeData}>
            <defs>
              <linearGradient id="feedback" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.22)" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="feedback"
              stroke="#4f46e5"
              fill="url(#feedback)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function SentimentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sentimentData}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={4}
            >
              {sentimentData.map((entry, index) => (
                <Cell key={entry.name} fill={sentimentColors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ThemeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Themes</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={themeInsights} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.22)" />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip />
            <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
