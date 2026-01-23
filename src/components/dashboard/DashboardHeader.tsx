import { Bell, Search, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div>
        <h1 className="text-xl font-semibold text-foreground">ภาพรวมระบบ</h1>
        <p className="text-sm text-muted-foreground">
          รายงานสรุปผลจากกล้องตรวจจับอัจฉริยะ
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหา..."
            className="pl-9 w-[240px] bg-muted/50"
          />
        </div>

        <Button variant="outline" size="sm">
          <FileDown className="w-4 h-4 mr-2" />
          Export Report
        </Button>

        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
            5
          </span>
        </Button>
      </div>
    </header>
  );
}
