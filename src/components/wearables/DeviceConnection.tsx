
import React, { useState } from "react";
import { Watch, Activity, Clock, Heart, Layers, Calendar, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DeviceConnection = () => {
  // In a real app, this would come from a proper state management system
  const [connectedDevices, setConnectedDevices] = useState([
    { id: 1, name: "Apple Watch Series 7", type: "smartwatch", status: "connected", lastSync: "5 minutes ago", battery: 72 }
  ]);

  const availableDevices = [
    { id: 2, name: "Fitbit Versa 3", type: "smartwatch", icon: Watch },
    { id: 3, name: "Garmin Venu 2", type: "smartwatch", icon: Watch },
    { id: 4, name: "Oura Ring Gen 3", type: "ring", icon: Activity }
  ];

  const mockConnect = (device) => {
    alert(`In a real app, this would initiate the connection process for ${device.name}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connected Devices</h1>
        <p className="text-muted-foreground mt-2">
          Manage your wearable devices and health data connections
        </p>
      </div>

      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="devices">My Devices</TabsTrigger>
          <TabsTrigger value="connect">Connect New</TabsTrigger>
          <TabsTrigger value="data">Data Access</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          {connectedDevices.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {connectedDevices.map(device => (
                <Card key={device.id} className="overflow-hidden">
                  <CardHeader className="bg-iatrohealth-500/10 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    </div>
                    <CardDescription>Last synced {device.lastSync}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-md p-3 flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-fertility-500" />
                          <span className="text-sm">Heart rate</span>
                        </div>
                        <div className="bg-muted rounded-md p-3 flex items-center">
                          <Layers className="h-4 w-4 mr-2 text-iatrohealth-500" />
                          <span className="text-sm">Weight</span>
                        </div>
                        <div className="bg-muted rounded-md p-3 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-iatrohealth-500" />
                          <span className="text-sm">Sleep</span>
                        </div>
                        <div className="bg-muted rounded-md p-3 flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-iatrohealth-500" />
                          <span className="text-sm">Activity</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-iatrohealth-500"
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{device.battery}%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4 pb-4">
                    <Button variant="ghost" size="sm">Sync Now</Button>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Watch className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No devices connected</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Connect a wearable device to enhance your fertility and health tracking
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Connect Device
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="connect">
          <div className="space-y-4 mt-4">
            <h3 className="font-medium text-lg">Available Devices</h3>
            <p className="text-sm text-muted-foreground">
              Select a device to connect. Make sure your device is nearby and in pairing mode.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {availableDevices.map((device) => {
                const DeviceIcon = device.icon;
                return (
                  <Card key={device.id} className="cursor-pointer hover:border-iatrohealth-300 transition-colors">
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <div className="h-12 w-12 rounded-full bg-iatrohealth-100 flex items-center justify-center mb-4">
                        <DeviceIcon className="h-6 w-6 text-iatrohealth-500" />
                      </div>
                      <h3 className="font-medium">{device.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        {device.type === 'smartwatch' ? 'Smartwatch' : 'Smart Ring'}
                      </p>
                      <Button 
                        onClick={() => mockConnect(device)} 
                        variant="outline" 
                        className="w-full"
                      >
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Other Device</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    Connect a different device
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    Add Manually
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="font-medium text-lg">Health Data Access</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage which health metrics are synced from your connected devices.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Connected Health Data</CardTitle>
                <CardDescription>
                  These metrics are being used for your personalized fertility and weight management plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Heart Rate", icon: Heart, active: true, description: "Resting and active heart rate monitoring" },
                    { name: "Sleep", icon: Clock, active: true, description: "Sleep duration, quality, and patterns" },
                    { name: "Activity", icon: Activity, active: true, description: "Steps, exercise, and movement tracking" },
                    { name: "Body Temperature", icon: Calendar, active: true, description: "Basal body temperature for fertility tracking" },
                    { name: "Weight", icon: Layers, active: true, description: "Weight measurements and trends" }
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between p-2 rounded">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded bg-${item.active ? 'iatrohealth-100' : 'muted'} flex items-center justify-center mr-3`}>
                            <ItemIcon className={`h-4 w-4 ${item.active ? 'text-iatrohealth-500' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </div>
                        <div>
                          {item.active ? (
                            <Badge className="bg-green-50 text-green-700 border-green-200 flex items-center">
                              <Check className="h-3 w-3 mr-1" /> Connected
                            </Badge>
                          ) : (
                            <Button size="sm" variant="outline">Enable</Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex items-start">
                <div className="text-amber-600 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-amber-800">Privacy Information</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    IatroHealth follows strict HIPAA and GDPR guidelines. Your health data is encrypted and never shared without your explicit consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceConnection;
