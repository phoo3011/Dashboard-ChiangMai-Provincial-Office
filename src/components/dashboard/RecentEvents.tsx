import { Eye, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const events = [
  {
    id: "#TR-88219",
    datetime: "24 ต.ค. 2567, 14:32",
    camera: "Camera 1",
    event: "มีคนเข้าพื้นที่เสี่ยง",
    type: "danger",
  },
  {
    id: "#TR-88220",
    datetime: "24 ต.ค. 2567, 13:15",
    camera: "Camera 4",
    event: "สูบบุหรี่ในพื้นที่ห้าม",
    type: "warning",
  },
  {
    id: "#TR-88221",
    datetime: "23 ต.ค. 2567, 18:42",
    camera: "Camera 2",
    event: "จักรยานยนต์เข้าพื้นที่",
    type: "warning",
  },
  {
    id: "#TR-88222",
    datetime: "23 ต.ค. 2567, 16:08",
    camera: "Camera 1",
    event: "ทะเลาะวิวาท",
    type: "danger",
  },
  {
    id: "#TR-88223",
    datetime: "23 ต.ค. 2567, 09:25",
    camera: "Camera 3",
    event: "ตรวจพบบุคคลในแบล็คลิสต์",
    type: "danger",
  },
];

const badgeStyles = {
  danger: "badge-danger",
  warning: "badge-warning",
  info: "badge-accent",
};

export function RecentEvents() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">
            เหตุการณ์ล่าสุด
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            รายการแจ้งเตือนจากระบบกล้อง
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1.5" />
            กรอง
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1.5" />
            CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Log ID</TableHead>
              <TableHead>วัน/เวลา</TableHead>
              <TableHead>กล้อง</TableHead>
              <TableHead>เหตุการณ์</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id} className="table-row-hover">
                <TableCell className="font-mono text-sm">{event.id}</TableCell>
                <TableCell className="text-sm">{event.datetime}</TableCell>
                <TableCell className="text-sm font-medium">
                  {event.camera}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-normal",
                      badgeStyles[event.type as keyof typeof badgeStyles]
                    )}
                  >
                    {event.event}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            แสดง 1 ถึง 5 จาก 28 รายการ
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              ก่อนหน้า
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              ถัดไป
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
