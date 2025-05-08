
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MedicationTracker from "../medication/MedicationTracker";
import DoctorEngagement from "../doctor/DoctorEngagement";

type Device = {
  name: string;
  type: string;
  connected: boolean;
  lastSync?: string;
  batteryLevel?: number;
};

const DeviceConnection = () => {
  const devices: Device[] = [
    { name: "Apple Watch", type: "Smartwatch", connected: true, lastSync: "2 hours ago", batteryLevel: 78 },
    { name: "Fitbit Charge", type: "Fitness Tracker", connected: false },
    { name: "Oura Ring", type: "Sleep & Activity Tracker", connected: false },
    { name: "Garmin Forerunner", type: "GPS Watch", connected: false },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-medium mb-6">Connected Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {devices.map((device) => (
            <Card key={device.name} className={device.connected ? "border-primary/50" : "border-muted"}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{device.name}</CardTitle>
                <CardDescription>{device.type}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {device.connected ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm font-medium text-green-600 flex items-center">
                        <span className="h-2 w-2 bg-green-600 rounded-full mr-1"></span>
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last synced:</span>
                      <span className="text-sm">{device.lastSync}</span>
                    </div>
                    {device.batteryLevel && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Battery:</span>
                        <span className="text-sm">{device.batteryLevel}%</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="text-sm font-medium text-muted-foreground flex items-center">
                      <span className="h-2 w-2 bg-muted-foreground rounded-full mr-1"></span>
                      Not Connected
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {device.connected ? (
                  <Button variant="outline" className="w-full text-sm">
                    Sync Now
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full text-sm">
                    Connect
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <MedicationTracker />
      </section>
      
      <section>
        <DoctorEngagement />
      </section>
    </div>
  );
};

export default DeviceConnection;
