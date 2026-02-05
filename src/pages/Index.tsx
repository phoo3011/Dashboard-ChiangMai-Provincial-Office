import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { TimeFilter } from "@/components/dashboard/TimeFilter";
import { EventChart } from "@/components/dashboard/EventChart";
import { RecentEvents } from "@/components/dashboard/RecentEvents";
import { HeatmapPlaceholder } from "@/components/dashboard/HeatmapPlaceholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserX,
  Car,
  AlertTriangle,
  MapPin,
  Camera,
} from "lucide-react";

const zoneData = [
  {
    id: "zone-a",
    name: "Zone A",
    description: "Main entrance & parking",
    cameras: 4,
    events: 23,
    people: 145,
  },
  {
    id: "zone-b",
    name: "Zone B",
    description: "Meeting room & main corridor",
    cameras: 4,
    events: 15,
    people: 89,
  },
  {
    id: "zone-c",
    name: "Zone C",
    description: "Storage & back door",
    cameras: 4,
    events: 9,
    people: 56,
  },
];

const Index = () => {
  const navigate = useNavigate();
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

          {/* Zones Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Zone Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {zoneData.map((zone) => (
                  <div
                    key={zone.id}
                    className="p-4 rounded-lg border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group"
                    onClick={() => navigate("/zones")}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary">
                          {zone.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {zone.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Camera className="w-4 h-4" />
                        <span>{zone.cameras} cameras</span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-semibold text-foreground">
                          {zone.events}
                        </span>
                        <p className="text-xs text-muted-foreground">events</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-foreground">
                          {zone.people}
                        </span>
                        <p className="text-xs text-muted-foreground">people</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => navigate("/zones")}
                variant="outline"
              >
                View Detailed Zones
              </Button>
            </CardContent>
          </Card>

          {/* Recent Events */}
          <div className="grid gap-6 grid-cols-1">
            <RecentEvents />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
