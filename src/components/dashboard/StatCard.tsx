import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: "default" | "accent" | "success" | "warning";
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = "default",
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="w-3 h-3" />;
    return change > 0 ? (
      <TrendingUp className="w-3 h-3" />
    ) : (
      <TrendingDown className="w-3 h-3" />
    );
  };

  const getTrendColor = () => {
    if (!change || change === 0) return "text-muted-foreground";
    return change > 0 ? "text-success" : "text-destructive";
  };

  const variantStyles = {
    default: "bg-card",
    accent: "bg-accent/5 border-accent/20",
    success: "bg-success/5 border-success/20",
    warning: "bg-warning/5 border-warning/20",
  };

  const iconBgStyles = {
    default: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
  };

  return (
    <div
      className={cn(
        "stat-card p-5 rounded-xl border shadow-sm",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        {icon && (
          <div
            className={cn(
              "p-2.5 rounded-lg",
              iconBgStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
      {(change !== undefined || changeLabel) && (
        <div className="flex items-center gap-1.5 mt-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded",
              getTrendColor(),
              change && change > 0 ? "bg-success/10" : change && change < 0 ? "bg-destructive/10" : "bg-muted"
            )}
          >
            {getTrendIcon()}
            {change !== undefined && `${change > 0 ? "+" : ""}${change}%`}
          </span>
          {changeLabel && (
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
