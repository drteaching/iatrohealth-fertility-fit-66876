
import React from "react";
import {
  Activity,
  Heart,
  Calendar,
  Clock,
  Layers,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const DashboardOverview = () => {
  // Mock data - in a real app this would come from API/state
  const healthStats = {
    steps: 7546,
    stepsGoal: 10000,
    caloriesBurned: 352,
    caloriesConsumed: 1450,
    caloriesGoal: 2000,
    heartRate: 68,
    sleepHours: 7.2,
    weight: 183,
    weightChange: -2.3,
    bmi: 29.4,
    cycleDay: 16,
    cyclePhase: "Fertile window",
    nextPeriod: "May 22",
    fertilityStatus: "High",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good afternoon, Jane</h1>
          <p className="text-muted-foreground">
            Here's your health overview for today.
          </p>
        </div>
        <Button className="bg-iatrohealth-500 hover:bg-iatrohealth-600">
          <Plus className="mr-2 h-4 w-4" /> Log Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight Progress</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthStats.weight} lbs</div>
            <div className={`text-xs ${healthStats.weightChange < 0 ? "text-green-500" : "text-fertility-500"} flex items-center`}>
              {healthStats.weightChange < 0 ? "↓" : "↑"} {Math.abs(healthStats.weightChange)} lbs this month
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>BMI: {healthStats.bmi}</span>
                <span>Goal: 24.9</span>
              </div>
              <Progress value={(healthStats.bmi / 40) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fertility Status</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-fertility-500">{healthStats.fertilityStatus}</div>
            <div className="text-xs text-muted-foreground">
              Cycle day {healthStats.cycleDay} • {healthStats.cyclePhase}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="text-xs">
                Next period: <span className="font-medium">{healthStats.nextPeriod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{healthStats.steps}</div>
                <div className="text-xs text-muted-foreground">steps today</div>
              </div>
              <div>
                <div className="text-xl font-bold">{healthStats.caloriesBurned}</div>
                <div className="text-xs text-muted-foreground">cal burned</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Steps</span>
                <span>{Math.round((healthStats.steps / healthStats.stepsGoal) * 100)}%</span>
              </div>
              <Progress value={(healthStats.steps / healthStats.stepsGoal) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="fertility">Fertility</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-fertility-400" />
                  Heart Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-2">
                  <div className="text-3xl font-bold">{healthStats.heartRate}</div>
                  <div className="text-sm text-muted-foreground mb-1">bpm</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Resting heart rate within normal range
                </div>
                <div className="mt-4 h-24 bg-muted rounded-md flex items-end p-2">
                  {/* Mock heart rate chart - would be replaced with actual chart */}
                  <div className="w-full h-full flex items-end">
                    {[60, 70, 65, 68, 72, 69, 66, 68, 70, 67, 65].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${(h / 100) * 100}%` }}
                        className="flex-1 bg-fertility-400 mx-0.5 rounded-t"
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-iatrohealth-400" />
                  Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-2">
                  <div className="text-3xl font-bold">{healthStats.sleepHours}</div>
                  <div className="text-sm text-muted-foreground mb-1">hours</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Sleep quality: Good
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-muted-foreground">{day}</div>
                      <div 
                        className="mt-1 w-full bg-iatrohealth-100 rounded"
                        style={{ 
                          height: `${Math.max(20, Math.random() * 40 + 20)}px` 
                        }}
                      >
                        <div 
                          className="bg-iatrohealth-400 h-full rounded" 
                          style={{ 
                            width: "100%",
                            opacity: i === 6 ? 0.5 : 1 // Today is partially filled
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Calories</div>
                    <div className="text-sm">{healthStats.caloriesConsumed} / {healthStats.caloriesGoal}</div>
                  </div>
                  <Progress 
                    value={(healthStats.caloriesConsumed / healthStats.caloriesGoal) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Protein</div>
                    <div className="text-xl font-bold">62g</div>
                    <div className="text-xs text-muted-foreground">31% of goal</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Carbs</div>
                    <div className="text-xl font-bold">184g</div>
                    <div className="text-xs text-muted-foreground">46% of goal</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Fat</div>
                    <div className="text-xl font-bold">41g</div>
                    <div className="text-xs text-muted-foreground">27% of goal</div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full">Log Meal with Photo</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fertility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cycle Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 bg-fertility-100 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">Current phase</div>
                    <div className="text-lg font-bold text-fertility-600">{healthStats.cyclePhase}</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-fertility-400 flex items-center justify-center text-white font-bold">
                    {healthStats.cycleDay}
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mt-4">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`cycle-day ${
                        i < 5 ? "cycle-day-period" : 
                        i >= 12 && i < 17 ? "cycle-day-fertile" : 
                        i === 14 ? "cycle-day-ovulation" : 
                        ""
                      } ${i === healthStats.cycleDay - 1 ? "ring-2 ring-offset-2 ring-fertility-500" : ""}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">Update Cycle Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Workout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Low-Impact Cardio</div>
                    <div className="text-sm text-muted-foreground">30 min</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Scheduled for 5:30 PM</div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="mr-2">View Details</Button>
                    <Button size="sm">Start Workout</Button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="text-sm font-medium mb-3">Weekly Activity</div>
                  <div className="grid grid-cols-7 gap-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs">{day}</div>
                        <div 
                          className={`mt-1 h-16 w-full rounded bg-muted flex flex-col-reverse ${
                            i <= 3 ? "bg-iatrohealth-100" : ""
                          }`}
                        >
                          {i <= 3 && (
                            <div 
                              className="bg-iatrohealth-400 rounded-b w-full"
                              style={{ height: `${30 + Math.random() * 40}%` }}
                            ></div>
                          )}
                        </div>
                        <div className="text-xs mt-1">
                          {i <= 3 ? "✓" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardOverview;
