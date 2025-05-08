
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Settings, Shield, LogOut } from "lucide-react";
import { useState } from "react";

const AccountPage = () => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("Jane Cooper");
  const [email, setEmail] = useState("jane.cooper@example.com");
  
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your account information has been updated."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar navigation */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
            <User className="h-5 w-5" />
            <span className="font-medium">Profile</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer">
            <Settings className="h-5 w-5" />
            <span>Preferences</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer">
            <Shield className="h-5 w-5" />
            <span>Security</span>
          </div>
          <Separator className="my-2" />
          <div 
            className="flex items-center gap-3 p-3 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="font-medium">Profile Photo</h4>
                  <p className="text-sm text-muted-foreground">
                    This will be displayed on your profile
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">Change</Button>
                    <Button size="sm" variant="outline" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>
              
              <Separator />
              
              <Button onClick={handleSaveChanges}>Save changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cycle Tracking Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Get reminders about logging your cycle data
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fertility Window Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about your fertility window
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Clinician Messages</p>
                  <p className="text-sm text-muted-foreground">
                    Notifications when you receive messages from your clinician
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Exercise Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Notifications for scheduled workouts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Privacy</CardTitle>
              <CardDescription>Control your data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Share Data with Clinicians</p>
                  <p className="text-sm text-muted-foreground">
                    Allow your clinicians to view your health data
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Research Participation</p>
                  <p className="text-sm text-muted-foreground">
                    Anonymously contribute your data to research studies
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Export</p>
                  <p className="text-sm text-muted-foreground">
                    Download all your health data
                  </p>
                </div>
                <Button variant="outline" size="sm">Export</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
