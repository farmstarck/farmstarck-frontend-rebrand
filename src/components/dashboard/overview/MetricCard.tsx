// components/dashboard/ui/MetricCard.tsx
import React from "react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  bg: string;
  dark?: boolean;
}

const MetricCard = ({
  title,
  value,
  sub,
  icon: Icon,
  bg,
  dark = false,
}: MetricCardProps) => (
  <div
    className={`rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${bg}`}
  >
    <div className="flex items-start justify-between mb-3">
      <p
        className={`text-sm font-medium ${dark ? "text-white/80" : "text-gray-500"}`}
      >
        {title}
      </p>
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark ? "bg-white/15" : "bg-white"}`}
      >
        <Icon size={16} className={dark ? "text-white" : "text-primary"} />
      </div>
    </div>
    <p
      className={`text-2xl font-bold truncate capitalize ${dark ? "text-white" : "text-gray-900"}`}
    >
      {value}
    </p>
    {sub && (
      <p className={`text-xs mt-1 ${dark ? "text-white/60" : "text-gray-400"}`}>
        {sub}
      </p>
    )}
  </div>
);

export default MetricCard;
