import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function Alerts() {
  const alerts = [
    {
      id: 1,
      title: "กล้องหมายเลข 1 ออนไลน์ไม่เข้า",
      type: "danger",
      time: "5 นาทีที่แล้ว",
      status: "unread",
    },
    {
      id: 2,
      title: "ตรวจพบบุคคลในแบล็คลิสต์",
      type: "danger",
      time: "10 นาทีที่แล้ว",
      status: "unread",
    },
    {
      id: 3,
      title: "สูบบุหรี่ในพื้นที่ห้าม",
      type: "warning",
      time: "1 ชั่วโมงที่แล้ว",
      status: "read",
    },
    {
      id: 4,
      title: "ระบบกล้องอัปเดตเสร็จแล้ว",
      type: "success",
      time: "3 ชั่วโมงที่แล้ว",
      status: "read",
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              การแจ้งเตือน
            </h1>
            <p className="text-muted-foreground">
              รายการแจ้งเตือนและข้อมูลสำคัญจากระบบ
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ยังไม่ได้อ่าน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  รวมทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ฉุกเฉิน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  เตือนระวัง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">15</div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  รายการแจ้งเตือนล่าสุด
                </CardTitle>
              </div>
              <Button variant="outline" size="sm">
                ทำเครื่องหมายว่าอ่านแล้ว
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    {alert.status === "unread" && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{alert.title}</h3>
                        <Badge
                          variant={
                            alert.type === "danger"
                              ? "destructive"
                              : alert.type === "warning"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {alert.type === "danger"
                            ? "ฉุกเฉิน"
                            : alert.type === "warning"
                              ? "เตือน"
                              : "สำเร็จ"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      ดู
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
