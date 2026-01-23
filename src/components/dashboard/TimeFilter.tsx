import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const timeRanges = [
  { id: "daily", label: "รายวัน" },
  { id: "monthly", label: "รายเดือน" },
  { id: "yearly", label: "รายปี" },
];

const zones = [
  { id: "all", label: "ทุกโซน" },
  { id: "zone-a", label: "Zone A" },
  { id: "zone-b", label: "Zone B" },
  { id: "zone-c", label: "Zone C" },
];

export function TimeFilter() {
  const [activeRange, setActiveRange] = useState("monthly");

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
              onClick={() => setActiveRange(range.id)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                activeRange === range.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="เลือกโซน" />
          </SelectTrigger>
          <SelectContent>
            {zones.map((zone) => (
              <SelectItem key={zone.id} value={zone.id}>
                {zone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
