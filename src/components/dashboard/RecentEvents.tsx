import { Eye, Filter, Download } from "lucide-react";
import { useState, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDashboard } from "@/context/DashboardContext";

// Zone-to-Camera mapping
const zoneToCamera: Record<string, number[]> = {
  "zone-a": [1, 2, 7, 8],
  "zone-b": [3, 4, 9, 10],
  "zone-c": [5, 6, 11, 12],
  "all": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const events = [
  {
    id: "#CM-88219",
    datetime: "24 ต.ค. 2567, 14:32",
    camera: 1,
    event: "มีคนเข้าพื้นที่เสี่ยง",
    type: "danger",
  },
  {
    id: "#CM-88220",
    datetime: "24 ต.ค. 2567, 13:15",
    camera: 4,
    event: "สูบบุหรี่ในพื้นที่ห้าม",
    type: "warning",
  },
  {
    id: "#CM-88221",
    datetime: "23 ต.ค. 2567, 18:42",
    camera: 2,
    event: "จักรยานยนต์เข้าพื้นที่",
    type: "warning",
  },
  {
    id: "#CM-88222",
    datetime: "23 ต.ค. 2567, 16:08",
    camera: 1,
    event: "ทะเลาะวิวาท",
    type: "danger",
  },
  {
    id: "#CM-88223",
    datetime: "23 ต.ค. 2567, 09:25",
    camera: 3,
    event: "ตรวจพบบุคคลในแบล็คลิสต์",
    type: "danger",
  },
  {
    id: "#CM-88224",
    datetime: "22 ต.ค. 2567, 15:45",
    camera: 2,
    event: "รถบรรทุกเข้าพื้นที่ห้าม",
    type: "warning",
  },
  {
    id: "#CM-88225",
    datetime: "22 ต.ค. 2567, 12:10",
    camera: 4,
    event: "มีคนเข้าพื้นที่เสี่ยง",
    type: "danger",
  },
  {
    id: "#CM-88226",
    datetime: "21 ต.ค. 2567, 10:55",
    camera: 1,
    event: "ทะเลาะวิวาท",
    type: "danger",
  },
  {
    id: "#CM-88227",
    datetime: "21 ต.ค. 2567, 08:30",
    camera: 3,
    event: "จักรยานยนต์เข้าพื้นที่",
    type: "warning",
  },
  {
    id: "#CM-88228",
    datetime: "20 ต.ค. 2567, 16:20",
    camera: 2,
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
  const { selectedZone, refreshKey } = useDashboard();
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    danger: true,
    warning: true,
    info: true,
  });

  const itemsPerPage = 5;

  // Filter events by zone and type
  const filteredEvents = useMemo(() => {
    const allowedCameras = zoneToCamera[selectedZone as keyof typeof zoneToCamera] || [];
    
    return events.filter(event => {
      const cameraMatch = allowedCameras.includes(event.camera as number);
      const typeMatch = filters[event.type as keyof typeof filters];
      return cameraMatch && typeMatch;
    });
  }, [selectedZone, filters, refreshKey]);

  const totalItems = filteredEvents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Ensure current page is valid
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  // Get items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEvents.slice(startIndex, endIndex);

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
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1.5" />
                กรอง
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ตัวกรองเหตุการณ์</DialogTitle>
                <DialogDescription>
                  เลือกประเภทเหตุการณ์ที่ต้องการแสดง
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="danger"
                    checked={filters.danger}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, danger: checked as boolean })
                    }
                  />
                  <Label htmlFor="danger" className="cursor-pointer">
                    เหตุการณ์ฉุกเฉิน
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="warning"
                    checked={filters.warning}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, warning: checked as boolean })
                    }
                  />
                  <Label htmlFor="warning" className="cursor-pointer">
                    เตือนระวัง
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="info"
                    checked={filters.info}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, info: checked as boolean })
                    }
                  />
                  <Label htmlFor="info" className="cursor-pointer">
                    ข้อมูล
                  </Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">ยกเลิก</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>ใช้งาน</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
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
            {currentItems.map((event) => (
              <TableRow key={event.id} className="table-row-hover">
                <TableCell className="font-mono text-sm">{event.id}</TableCell>
                <TableCell className="text-sm">{event.datetime}</TableCell>
                <TableCell className="text-sm font-medium">
                  Camera {event.camera}
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
            แสดง {filteredEvents.length === 0 ? 0 : startIndex + 1} ถึง {Math.min(endIndex, totalItems)} จาก {totalItems} รายการ
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ก่อนหน้า
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                size="sm"
                className={cn(
                  currentPage === page &&
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
