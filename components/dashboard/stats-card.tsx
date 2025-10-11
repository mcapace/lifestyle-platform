import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-stone-400">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-stone-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-stone-100">{value}</div>
        {trend && (
          <p
            className={`text-xs mt-1 ${
              trend.isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}

