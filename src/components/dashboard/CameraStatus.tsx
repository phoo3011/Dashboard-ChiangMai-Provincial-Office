import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Wifi, WifiOff } from "lucide-react";

const cameras = [
  { id: 1, name: "Camera 1", zone: "Zone A - ทางเข้าหลัก", status: "online" },
  { id: 2, name: "Camera 2", zone: "Zone A - ลานจอดรถ", status: "online" },
  { id: 3, name: "Camera 3", zone: "Zone B - ห้องประชุม", status: "offline" },
  { id: 4, name: "Camera 4", zone: "Zone B - ทางเดินหลัก", status: "online" },
  { id: 5, name: "Camera 5", zone: "Zone C - คลังสินค้า", status: "online" },
  { id: 6, name: "Camera 6", zone: "Zone C - ประตูหลัง", status: "warning" },
];

const statusConfig = {
  online: {
    label: "ออนไลน์",
    color: "bg-success",
    icon: Wifi,
    textColor: "text-success",
  },
  offline: {
    label: "ออฟไลน์",
    color: "bg-destructive",
    icon: WifiOff,
    textColor: "text-destructive",
  },
  warning: {
    label: "มีปัญหา",
    color: "bg-warning",
    icon: Wifi,
    textColor: "text-warning",
  },
};

export function CameraStatus() {
  const onlineCount = cameras.filter((c) => c.status === "online").length;
  const totalCount = cameras.length;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              สถานะกล้อง
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              ออนไลน์ {onlineCount} / {totalCount} ตัว
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">ออนไลน์</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">ออฟไลน์</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {cameras.map((camera) => {
            const config = statusConfig[camera.status as keyof typeof statusConfig];
            const Icon = config.icon;
            return (
              <div
                key={camera.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border transition-colors",
                  camera.status === "offline" && "bg-destructive/5 border-destructive/20",
                  camera.status === "warning" && "bg-warning/5 border-warning/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      camera.status === "online" && "bg-success/10",
                      camera.status === "offline" && "bg-destructive/10",
                      camera.status === "warning" && "bg-warning/10"
                    )}
                  >
                    <Camera className={cn("w-4 h-4", config.textColor)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{camera.name}</p>
                    <p className="text-xs text-muted-foreground">{camera.zone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", config.textColor)} />
                  <span className={cn("text-xs font-medium", config.textColor)}>
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
