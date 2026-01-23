import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { TimeFilter } from "@/components/dashboard/TimeFilter";
import { EventChart } from "@/components/dashboard/EventChart";
import { RecentEvents } from "@/components/dashboard/RecentEvents";
import { CameraStatus } from "@/components/dashboard/CameraStatus";
import { HeatmapPlaceholder } from "@/components/dashboard/HeatmapPlaceholder";
import {
  Users,
  UserX,
  Car,
  AlertTriangle,
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Time Filter */}
          <TimeFilter />
          
          {/* KPI Cards - Top 4 metrics */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="จำนวนคนเข้า-ออก"
              value="256 คน"
              change={5.2}
              changeLabel="จากเดือนที่แล้ว"
              icon={<Users className="w-5 h-5" />}
            />
            <StatCard
              title="ผู้ต้องสงสัย / แบล็คลิสต์"
              value="12 คน"
              change={-2.1}
              changeLabel="จากเดือนที่แล้ว"
              icon={<UserX className="w-5 h-5" />}
              variant="accent"
            />
            <StatCard
              title="รถเข้าออก / ทำผิดกฎ"
              value="89 / 3"
              change={1.8}
              changeLabel="จากเดือนที่แล้ว"
              icon={<Car className="w-5 h-5" />}
            />
            <StatCard
              title="จำนวนเหตุการณ์"
              value="47 ครั้ง"
              change={12.5}
              changeLabel="จากเดือนที่แล้ว"
              icon={<AlertTriangle className="w-5 h-5" />}
              variant="warning"
            />
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <EventChart />
            <HeatmapPlaceholder />
          </div>

          {/* Camera Status & Recent Events */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <CameraStatus />
            </div>
            <div className="lg:col-span-2">
              <RecentEvents />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
