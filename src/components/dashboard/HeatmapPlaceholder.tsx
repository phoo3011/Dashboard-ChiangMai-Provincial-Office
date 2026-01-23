import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function HeatmapPlaceholder() {
  // Simple grid heatmap visualization
  const heatmapData = [
    [0.2, 0.4, 0.6, 0.8, 0.5, 0.3, 0.2, 0.1],
    [0.3, 0.5, 0.9, 1.0, 0.8, 0.5, 0.3, 0.2],
    [0.4, 0.7, 0.8, 0.9, 0.7, 0.6, 0.4, 0.3],
    [0.3, 0.5, 0.6, 0.7, 0.6, 0.5, 0.4, 0.2],
    [0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.3, 0.2],
    [0.1, 0.2, 0.3, 0.3, 0.3, 0.2, 0.2, 0.1],
  ];

  const getHeatColor = (value: number) => {
    if (value >= 0.8) return "bg-destructive/80";
    if (value >= 0.6) return "bg-warning/80";
    if (value >= 0.4) return "bg-chart-2/60";
    if (value >= 0.2) return "bg-chart-1/40";
    return "bg-chart-1/20";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Heatmap - จุดเกิดเหตุการณ์
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              แสดงความถี่ของเหตุการณ์ในแต่ละพื้นที่
            </p>
          </div>
          <MapPin className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 p-4 bg-muted/30 rounded-lg">
          {heatmapData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex-1 h-8 rounded transition-colors ${getHeatColor(value)}`}
                  title={`ความถี่: ${Math.round(value * 100)}%`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-1/20" />
            <span className="text-xs text-muted-foreground">ต่ำ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-2/60" />
            <span className="text-xs text-muted-foreground">ปานกลาง</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning/80" />
            <span className="text-xs text-muted-foreground">สูง</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive/80" />
            <span className="text-xs text-muted-foreground">วิกฤต</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
