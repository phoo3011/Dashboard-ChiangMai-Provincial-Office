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
import { Users, AlertTriangle, TrendingUp, Clock, Camera } from "lucide-react";
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
  "zone-a": {
    name: "Zone A",
    description: "ทางเข้าหลัก และลานจอดรถ",
    cameras: 2,
    events: 23,
    people: 145,
  },
  "zone-b": {
    name: "Zone B",
    description: "ห้องประชุม และทางเดินหลัก",
    cameras: 2,
    events: 15,
    people: 89,
  },
  "zone-c": {
    name: "Zone C",
    description: "คลังสินค้า และประตูหลัง",
    cameras: 2,
    events: 9,
    people: 45,
  },
};

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
                  <h2 className="text-lg font-semibold">เลือกโซน</h2>
                  <Select defaultValue="zone-a">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="เลือกโซน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zone-a">Zone A - ทางเข้าหลัก</SelectItem>
                      <SelectItem value="zone-b">Zone B - ห้องประชุม</SelectItem>
                      <SelectItem value="zone-c">Zone C - คลังสินค้า</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="ช่วงเวลา" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">รายวัน</SelectItem>
                      <SelectItem value="monthly">รายเดือน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Stats */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="จำนวนกล้องในโซน"
              value="2 ตัว"
              icon={<Camera className="w-5 h-5" />}
            />
            <StatCard
              title="จำนวนคนเข้าโซน"
              value="145 คน"
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
              value="23 ครั้ง"
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
