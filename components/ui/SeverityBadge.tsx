import * as React from 'react';
import { Badge } from '@/components/ui/badge';

interface SeverityBadgeProps {
  severity: "INFO" | "WARNING" | "FAULT" | "CRITICAL";
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  let colorClass = "";

  switch (severity?.toUpperCase()) {
    case "INFO":
      colorClass = "bg-blue-600 hover:bg-blue-700 text-white";
      break;
    case "WARNING":
      colorClass = "bg-amber-500 hover:bg-amber-600 text-amber-950";
      break;
    case "FAULT":
      colorClass = "bg-orange-600 hover:bg-orange-700 text-white";
      break;
    case "CRITICAL":
      colorClass = "bg-red-600 hover:bg-red-700 text-white font-bold animate-pulse";
      break;
    default:
      colorClass = "bg-gray-600";
  }

  return (
    <Badge className={`px-2 py-0.5 text-xs font-mono rounded ${colorClass}`}>
      {severity ? severity.toUpperCase() : "UNKNOWN"}
    </Badge>
  );
}
