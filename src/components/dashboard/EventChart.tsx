import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "ม.ค.", value: 145, entries: 89, exits: 56 },
  { month: "ก.พ.", value: 132, entries: 78, exits: 54 },
  { month: "มี.ค.", value: 168, entries: 95, exits: 73 },
  { month: "เม.ย.", value: 156, entries: 88, exits: 68 },
  { month: "พ.ค.", value: 178, entries: 102, exits: 76 },
  { month: "มิ.ย.", value: 142, entries: 82, exits: 60 },
  { month: "ก.ค.", value: 192, entries: 110, exits: 82 },
  { month: "ส.ค.", value: 165, entries: 94, exits: 71 },
];

export function EventChart() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          สถิติจำนวนคนเข้า-ออก รายเดือน
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          แสดงข้อมูลการเข้า-ออกพื้นที่ในปี 2567
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
                        <p className="font-medium text-foreground mb-1">{label}</p>
                        <p className="text-sm text-muted-foreground">
                          จำนวนรวม: <span className="font-medium text-foreground">{payload[0].value}</span> คน
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === data.length - 2
                        ? "hsl(var(--chart-1))"
                        : "hsl(var(--chart-2))"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
