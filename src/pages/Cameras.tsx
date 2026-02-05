import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, AlertCircle, Camera as CameraIcon } from "lucide-react";
import { useState } from "react";
import { Camera as CameraType } from "@/types/camera";

const allCameras: CameraType[] = [
  { id: 1, name: "Camera 1", zone: "Zone A - ทางเข้าหลัก", status: "online", resolution: "4K", fps: 30 },
  { id: 2, name: "Camera 2", zone: "Zone A - ลานจอดรถ", status: "online", resolution: "2K", fps: 25 },
  { id: 3, name: "Camera 3", zone: "Zone B - ห้องประชุม", status: "offline", resolution: "1080p", fps: 30 },
  { id: 4, name: "Camera 4", zone: "Zone B - ทางเดินหลัก", status: "online", resolution: "4K", fps: 30 },
  { id: 5, name: "Camera 5", zone: "Zone C - คลังสินค้า", status: "online", resolution: "2K", fps: 25 },
  { id: 6, name: "Camera 6", zone: "Zone C - ประตูหลัง", status: "warning", resolution: "1080p", fps: 20 },
  { id: 7, name: "Camera 7", zone: "Zone A - ระเบียงชั้น 2", status: "online", resolution: "4K", fps: 30 },
  { id: 8, name: "Camera 8", zone: "Zone A - ระเบียงชั้น 3", status: "online", resolution: "2K", fps: 25 },
  { id: 9, name: "Camera 9", zone: "Zone B - บันไดเหล็ก", status: "online", resolution: "1080p", fps: 30 },
  { id: 10, name: "Camera 10", zone: "Zone B - ห้องสตรี", status: "warning", resolution: "4K", fps: 30 },
  { id: 11, name: "Camera 11", zone: "Zone C - ทางออกฉุกเฉิน", status: "online", resolution: "2K", fps: 25 },
  { id: 12, name: "Camera 12", zone: "Zone C - ทางสอบเทียม", status: "offline", resolution: "1080p", fps: 15 },
];

export default function Cameras() {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);

  const onlineCount = allCameras.filter((c) => c.status === "online").length;
  const offlineCount = allCameras.filter((c) => c.status === "offline").length;
  const warningCount = allCameras.filter((c) => c.status === "warning").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success/20 text-success border-success/30";
      case "offline":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "warning":
        return "bg-warning/20 text-warning border-warning/30";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="w-4 h-4" />;
      case "offline":
        return <WifiOff className="w-4 h-4" />;
      case "warning":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <CameraIcon className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "online":
        return "ออนไลน์";
      case "offline":
        return "ออฟไลน์";
      case "warning":
        return "มีปัญหา";
      default:
        return "ไม่ทราบ";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              จัดการกล้อง
            </h1>
            <p className="text-muted-foreground">
              แสดงและจัดการกล้อง 12 ตัวในระบบ
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  กล้องทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allCameras.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ออนไลน์
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{onlineCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  มีปัญหา
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{warningCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ออฟไลน์
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{offlineCount}</div>
              </CardContent>
            </Card>
          </div>

          {/* Cameras Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                รายการกล้องทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {allCameras.map((camera) => (
                  <div
                    key={camera.id}
                    onClick={() => setSelectedCamera(camera.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                      selectedCamera === camera.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${getStatusColor(camera.status).replace("text-", "bg-").replace("border", "")}`}>
                          {getStatusIcon(camera.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {camera.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {camera.zone}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(camera.status)}>
                        {getStatusLabel(camera.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>ความละเอียด: {camera.resolution}</span>
                      <span>FPS: {camera.fps}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Camera Details */}
          {selectedCamera && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  รายละเอียด{" "}
                  {allCameras.find((c) => c.id === selectedCamera)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      ชื่อกล้อง
                    </p>
                    <p className="font-medium">
                      {allCameras.find((c) => c.id === selectedCamera)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">โซน</p>
                    <p className="font-medium">
                      {allCameras.find((c) => c.id === selectedCamera)?.zone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      ความละเอียด
                    </p>
                    <p className="font-medium">
                      {allCameras.find((c) => c.id === selectedCamera)
                        ?.resolution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">FPS</p>
                    <p className="font-medium">
                      {allCameras.find((c) => c.id === selectedCamera)?.fps}{" "}
                      frames/second
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">สถานะ</p>
                    <Badge
                      className={getStatusColor(
                        allCameras.find((c) => c.id === selectedCamera)
                          ?.status || "online"
                      )}
                    >
                      {getStatusLabel(
                        allCameras.find((c) => c.id === selectedCamera)
                          ?.status || "online"
                      )}
                    </Badge>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button>ดูสด</Button>
                  <Button variant="outline">ตั้งค่า</Button>
                  <Button variant="outline">บันทึก</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
