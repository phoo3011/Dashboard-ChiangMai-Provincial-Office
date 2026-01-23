import { Button } from "@/components/ui/button";
import { Calendar, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/DashboardContext";

const timeRanges = [
  { id: "daily", label: "วัน" },
  { id: "monthly", label: "เดือน" },
  { id: "yearly", label: "ปี" },
];

export function TimeFilter() {
  const { timeRange, setTimeRange, selectedZone, triggerRefresh } = useDashboard();

  const handleTimeRangeChange = (rangeId: string) => {
    setTimeRange(rangeId as any);
    console.log("Time range changed:", rangeId);
  };

  const handleRefresh = () => {
    triggerRefresh();
    console.log("Refreshing data with range:", timeRange, "zone:", selectedZone);
    // Success message
    const message = timeRange === "daily" 
      ? "Updated daily data ✓" 
      : timeRange === "monthly" 
      ? "Updated monthly data ✓" 
      : "Updated yearly data ✓";
    alert(message);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl border shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">ช่วงเวลา:</span>
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleTimeRangeChange(range.id)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                timeRange === range.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" size="icon" onClick={handleRefresh} title="Refresh data">
        <RefreshCw className="w-4 h-4" />
      </Button>
    </div>
  );
}