/**
 * Dashboard State Management
 * Shared state for time range, zone selection, and data filtering
 */

import { createContext, useContext, useState, ReactNode } from "react";

export type TimeRange = "daily" | "monthly" | "yearly";
export type ZoneId = "all" | "zone-a" | "zone-b" | "zone-c";

interface DashboardContextType {
  // Time Range
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  
  // Zone Selection
  selectedZone: ZoneId;
  setSelectedZone: (zone: ZoneId) => void;
  
  // Refresh trigger
  refreshKey: number;
  triggerRefresh: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [selectedZone, setSelectedZone] = useState<ZoneId>("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <DashboardContext.Provider
      value={{
        timeRange,
        setTimeRange,
        selectedZone,
        setSelectedZone,
        refreshKey,
        triggerRefresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
}
