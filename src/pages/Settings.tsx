import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Bell, Lock, Eye, Users, BarChart3 } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    darkMode: false,
    autoRefresh: true,
    publicProfile: false,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ตั้งค่า
            </h1>
            <p className="text-muted-foreground">
              จัดการการตั้งค่าบัญชีและการแจ้งเตือน
            </p>
          </div>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="w-4 h-4" />
                การแจ้งเตือน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    การแจ้งเตือนทางอีเมล
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    รับการแจ้งเตือนผ่านอีเมล
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle("emailNotifications")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    การแจ้งเตือน Push
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    รับการแจ้งเตือนแบบ Push ทำงานในเบราว์เซอร์
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle("pushNotifications")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    การแจ้งเตือน SMS
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    รับการแจ้งเตือนฉุกเฉินผ่าน SMS
                  </p>
                </div>
                <Switch
                  checked={settings.smsAlerts}
                  onCheckedChange={() => handleToggle("smsAlerts")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye className="w-4 h-4" />
                การแสดงผล
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">โหมดมืด</Label>
                  <p className="text-sm text-muted-foreground">
                    ใช้งานโหมดมืด
                  </p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggle("darkMode")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    รีเฟรชอัตโนมัติ
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    อัปเดตข้อมูลโดยอัตโนมัติทุก 30 วินาที
                  </p>
                </div>
                <Switch
                  checked={settings.autoRefresh}
                  onCheckedChange={() => handleToggle("autoRefresh")}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-4 h-4" />
                ระบบ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-2 block">
                  ภาษา
                </Label>
                <Select defaultValue="th">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="th">ไทย</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-2 block">
                  เขตเวลา
                </Label>
                <Select defaultValue="bkk">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkk">GMT+7 (Bangkok)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="w-4 h-4" />
                ความเป็นส่วนตัว
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    โปรไฟล์สาธารณะ
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    อนุญาตให้ผู้อื่นมองเห็นโปรไฟล์ของคุณ
                  </p>
                </div>
                <Switch
                  checked={settings.publicProfile}
                  onCheckedChange={() => handleToggle("publicProfile")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-destructive">
                <Users className="w-4 h-4" />
                บัญชี
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                เปลี่ยนรหัสผ่าน
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                ออกจากระบบ
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">ยกเลิก</Button>
            <Button>บันทึกการเปลี่ยนแปลง</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
