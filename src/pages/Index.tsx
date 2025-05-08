
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Calendar, 
  Home,
  Layers,
  Heart,
  Video,
  Clock,
  Pill,
  MessageSquare,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DeviceConnection from "@/components/wearables/DeviceConnection";
import CycleTracker from "@/components/cycle/CycleTracker";
import CalorieTracker from "@/components/nutrition/CalorieTracker";
import ExerciseProgram from "@/components/fitness/ExerciseProgram";

const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview />;
      case "devices":
        return <DeviceConnection />;
      case "cycle":
        return <CycleTracker />;
      case "nutrition":
        return <CalorieTracker />;
      case "exercise":
        return <ExerciseProgram />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="px-6 py-3">
                <h3 className="text-lg font-semibold text-sidebar-foreground">IatroHealth</h3>
                <p className="text-xs text-sidebar-foreground/70">Fertility Fit Program</p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <div className="space-y-1 px-2">
                <Button 
                  variant={activePage === "dashboard" ? "secondary" : "ghost"} 
                  onClick={() => setActivePage("dashboard")}
                  className="w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                
                <Button 
                  variant={activePage === "cycle" ? "secondary" : "ghost"} 
                  onClick={() => setActivePage("cycle")}
                  className="w-full justify-start"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Cycle Tracking
                </Button>
                
                <Button 
                  variant={activePage === "nutrition" ? "secondary" : "ghost"} 
                  onClick={() => setActivePage("nutrition")}
                  className="w-full justify-start"
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Nutrition
                </Button>
                
                <Button 
                  variant={activePage === "exercise" ? "secondary" : "ghost"} 
                  onClick={() => setActivePage("exercise")}
                  className="w-full justify-start"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Exercise
                </Button>
                
                <Button 
                  variant={activePage === "devices" ? "secondary" : "ghost"} 
                  onClick={() => setActivePage("devices")}
                  className="w-full justify-start"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Devices
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  <Pill className="mr-2 h-4 w-4" />
                  Medications
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Clinician Chat
                </Button>

                <Link to="/account">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </Link>
              </div>

              {/* Health stats summary */}
              <div className="mt-6 px-4">
                <div className="text-xs font-semibold mb-2 text-sidebar-foreground/70">TODAY'S SNAPSHOT</div>
                <div className="space-y-3">
                  <div className="bg-sidebar-accent rounded-md p-2 text-sidebar-accent-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-sidebar-accent-foreground/70" />
                      <span className="text-xs">7.2 hrs sleep</span>
                    </div>
                  </div>
                  <div className="bg-sidebar-accent rounded-md p-2 text-sidebar-accent-foreground">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-sidebar-accent-foreground/70" />
                      <span className="text-xs">7,546 steps</span>
                    </div>
                  </div>
                  <div className="bg-sidebar-accent rounded-md p-2 text-sidebar-accent-foreground">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-sidebar-accent-foreground/70" />
                      <span className="text-xs">68 bpm resting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming workout */}
              <div className="mt-6 px-4">
                <div className="text-xs font-semibold mb-2 text-sidebar-foreground/70">NEXT WORKOUT</div>
                <div className="bg-sidebar-accent rounded-md p-3 text-sidebar-accent-foreground">
                  <div className="flex items-center mb-2">
                    <Video className="h-4 w-4 mr-2 text-sidebar-accent-foreground/70" />
                    <span className="text-xs font-medium">Low-Impact Cardio</span>
                  </div>
                  <div className="text-xs text-sidebar-accent-foreground/70 mb-3">Today, 5:30 PM • 30 min</div>
                  <Button size="sm" variant="secondary" className="w-full text-xs">
                    Start Workout
                  </Button>
                </div>
              </div>
            </SidebarContent>
          </Sidebar>

          <div className="flex-1">
            <div className="container py-6">
              <div className="flex items-center lg:hidden mb-6">
                <SidebarTrigger />
              </div>
              {renderActivePage()}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
