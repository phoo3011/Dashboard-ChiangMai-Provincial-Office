import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    { id: 1, message: "กล้องหมายเลข 1 ออนไลน์ไม่เข้า", time: "5 นาที" },
    { id: 2, message: "ตรวจพบบุคคลในแบล็คลิสต์", time: "10 นาที" },
    { id: 3, message: "สูบบุหรี่ในพื้นที่ห้าม", time: "1 ชั่วโมง" },
    { id: 4, message: "จักรยานยนต์เข้าพื้นที่", time: "2 ชั่วโมง" },
    { id: 5, message: "ทะเลาะวิวาท", time: "3 ชั่วโมง" },
  ];

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Provincial Office Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหา..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[240px] bg-muted/50"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>การแจ้งเตือน</DialogTitle>
              <DialogDescription>
                รายการแจ้งเตือนล่าสุดของคุณ
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
