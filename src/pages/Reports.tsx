import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  const reports = [
    {
      id: 1,
      name: "รายงานเหตุการณ์ประจำเดือน",
      date: "24 ม.ค. 2567",
      status: "complete",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "รายงานสรุปกิจกรรมประจำสัปดาห์",
      date: "23 ม.ค. 2567",
      status: "complete",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "รายงานการเข้า-ออกจังหวัด",
      date: "22 ม.ค. 2567",
      status: "complete",
      size: "3.2 MB",
    },
    {
      id: 4,
      name: "รายงานสถิติการพบบุคคลต้องสงสัย",
      date: "21 ม.ค. 2567",
      status: "processing",
      size: "-",
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
              รายงานจังหวัด
            </h1>
            <p className="text-muted-foreground">
              รายงานสรุปข้อมูลและสถิติต่างๆ จากระบบ
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  รายงานทั้งหมด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  เดือนนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  รอประมวลผล
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">2</div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">
                รายการรายงาน
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1.5" />
                  กรอง
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-1.5" />
                  สร้างใหม่
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อรายงาน</TableHead>
                    <TableHead>วันที่</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>ขนาด</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        {report.name}
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.status === "complete"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {report.status === "complete"
                            ? "สำเร็จ"
                            : "รอประมวลผล"}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell className="text-right">
                        {report.status === "complete" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
