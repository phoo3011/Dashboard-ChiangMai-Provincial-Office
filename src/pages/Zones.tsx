import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, AlertTriangle, TrendingUp, Clock, Camera, Wifi, WifiOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Camera as CameraType } from "@/types/camera";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const zoneData = {
  "zone-1": {
    name: "Zone 1",
    description: "ประตูทางเข้าหลัก",
    cameras: 3,
    events: 28,
    people: 156,
  },
  "zone-2": {
    name: "Zone 2",
    description: "ประตูทางเข้าทิศเหนือ",
    cameras: 2,
    events: 12,
    people: 64,
  },
  "zone-3": {
    name: "Zone 3",
    description: "ประตูทางเข้าทิศใต้",
    cameras: 2,
    events: 18,
    people: 87,
  },
  "zone-4": {
    name: "Zone 4",
    description: "บริเวณโดยรอบ",
    cameras: 4,
    events: 15,
    people: 92,
  },
  "zone-5": {
    name: "Zone 5",
    description: "พื้นที่เข้า-ออกมอเตอร์ไซต์",
    cameras: 1,
    events: 22,
    people: 103,
  },
};

const camerasData = {
  "zone-1": [
    { id: 1, name: "Camera 1", zone: "Zone 1 - ประตูหลัก (ซ้าย)", status: "online", resolution: "4K", fps: 30 },
    { id: 2, name: "Camera 2", zone: "Zone 1 - ประตูหลัก (กลาง)", status: "online", resolution: "4K", fps: 30 },
    { id: 11, name: "Camera 11", zone: "Zone 1 - ประตูหลัก (ขวา)", status: "online", resolution: "2K", fps: 25 },
  ] as CameraType[],
  "zone-2": [
    { id: 3, name: "Camera 3", zone: "Zone 2 - ประตูเหนือ (หลัก)", status: "online", resolution: "4K", fps: 30 },
    { id: 4, name: "Camera 4", zone: "Zone 2 - ประตูเหนือ (สำรอง)", status: "online", resolution: "1080p", fps: 30 },
  ] as CameraType[],
  "zone-3": [
    { id: 5, name: "Camera 5", zone: "Zone 3 - ประตูใต้ (หลัก)", status: "online", resolution: "4K", fps: 30 },
    { id: 6, name: "Camera 6", zone: "Zone 3 - ประตูใต้ (สำรอง)", status: "warning", resolution: "2K", fps: 25 },
  ] as CameraType[],
  "zone-4": [
    { id: 8, name: "Camera 8", zone: "Zone 4 - บริเวณด้านหนึ่ง", status: "online", resolution: "2K", fps: 25 },
    { id: 9, name: "Camera 9", zone: "Zone 4 - บริเวณด้านสอง", status: "online", resolution: "1080p", fps: 30 },
    { id: 12, name: "Camera 12", zone: "Zone 4 - บริเวณด้านสาม", status: "online", resolution: "4K", fps: 30 },
    { id: 13, name: "Camera 13", zone: "Zone 4 - บริเวณทางเดิน", status: "warning", resolution: "2K", fps: 25 },
  ] as CameraType[],
  "zone-5": [
    { id: 10, name: "Camera 10", zone: "Zone 5 - จุดมอเตอร์ไซต์", status: "online", resolution: "1080p", fps: 30 },
  ] as CameraType[],
} as const;

const eventStats = [
  { name: "สัปดาห์ 1", events: 12, ratio: 8 },
  { name: "สัปดาห์ 2", events: 18, ratio: 12 },
  { name: "สัปดาห์ 3", events: 15, ratio: 10 },
  { name: "สัปดาห์ 4", events: 23, ratio: 15 },
];

const hourlyData = [
  { hour: "06:00", count: 5 },
  { hour: "08:00", count: 25 },
  { hour: "10:00", count: 18 },
  { hour: "12:00", count: 32 },
  { hour: "14:00", count: 28 },
  { hour: "16:00", count: 35 },
  { hour: "18:00", count: 42 },
  { hour: "20:00", count: 15 },
  { hour: "22:00", count: 8 },
];

const recentHistory = [
  { id: 1, event: "มีคนเข้าพื้นที่เสี่ยง", time: "14:32", zone: "Zone A" },
  { id: 2, event: "สูบบุหรี่ในพื้นที่ห้าม", time: "13:15", zone: "Zone B" },
  { id: 3, event: "จักรยานยนต์เข้าพื้นที่", time: "12:42", zone: "Zone A" },
  { id: 4, event: "ตรวจพบบุคคลในแบล็คลิสต์", time: "11:08", zone: "Zone C" },
];

const Zones = () => {
  const [selectedZone, setSelectedZone] = useState("zone-1");

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
        return <Camera className="w-4 h-4" />;
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

  const currentZone = zoneData[selectedZone as keyof typeof zoneData];
  const zoneCameras = camerasData[selectedZone as keyof typeof camerasData] || [];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Zone Selector */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold">Zone</h2>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zone-1">Zone 1 - ประตูทางเข้าหลัก</SelectItem>
                      <SelectItem value="zone-2">Zone 2 - ประตูทางเข้าทิศเหนือ</SelectItem>
                      <SelectItem value="zone-3">Zone 3 - ประตูทางเข้าทิศใต้</SelectItem>
                      <SelectItem value="zone-4">Zone 4 - บริเวณโดยรอบ</SelectItem>
                      <SelectItem value="zone-5">Zone 5 - พื้นที่เข้า-ออกมอเตอร์ไซต์</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="ช่วงเวลา" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">วัน</SelectItem>
                      <SelectItem value="monthly">เดือน</SelectItem>
                      <SelectItem value="yearly">ปี</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cameras in Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                กล้องใน {currentZone.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {zoneCameras.map((camera) => (
                  <div
                    key={camera.id}
                    className="p-4 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${getStatusColor(camera.status).replace("text-", "bg-").replace("border", "")}`}>
                          {getStatusIcon(camera.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {camera.name}
                          </h3>
                        </div>
                      </div>
                      <Badge className={getStatusColor(camera.status)}>
                        {getStatusLabel(camera.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Zone Stats */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="จำนวนกล้องในโซน"
              value={`${currentZone.cameras} ตัว`}
              icon={<Camera className="w-5 h-5" />}
            />
            <StatCard
              title="จำนวนคนเข้าโซน"
              value={`${currentZone.people} คน`}
              change={8.3}
              changeLabel="คิดเป็นเปอร์เซ็นต์"
              icon={<Users className="w-5 h-5" />}
            />
            <StatCard
              title="สัดส่วนจำนวนเหตุการณ์"
              value="48.9%"
              icon={<TrendingUp className="w-5 h-5" />}
              variant="accent"
            />
            <StatCard
              title="เหตุการณ์ในโซน"
              value={`${currentZone.events} ครั้ง`}
              change={5.2}
              icon={<AlertTriangle className="w-5 h-5" />}
              variant="warning"
            />
          </div>

          {/* Charts */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Event Stats Chart */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  กราฟสถิติเหตุการณ์
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  แสดงสถิติเหตุการณ์ในแต่ละสัปดาห์
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eventStats}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
                                <p className="font-medium text-foreground mb-1">{label}</p>
                                <p className="text-sm text-muted-foreground">
                                  เหตุการณ์: <span className="font-medium text-foreground">{payload[0].value}</span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="events" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Behavior by Time */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  พฤติกรรมตามช่วงเวลา
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  แสดงความถี่ของเหตุการณ์ตามช่วงเวลา
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
                                <p className="font-medium text-foreground mb-1">{label}</p>
                                <p className="text-sm text-muted-foreground">
                                  จำนวน: <span className="font-medium text-foreground">{payload[0].value}</span> ครั้ง
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" />
                ประวัติเหตุการณ์ล่าสุด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{item.id}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.event}</p>
                        <p className="text-xs text-muted-foreground">{item.zone}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Zones;
