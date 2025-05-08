
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type CycleDay = {
  day: number;
  date: Date;
  status: "period" | "fertile" | "ovulation" | "regular" | "predicted";
  selected?: boolean;
};

const CycleTracker = () => {
  // Current date for reference
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // For a real app, this would be fetched from an API/state
  const [viewingMonth, setViewingMonth] = useState(currentMonth);
  const [viewingYear, setViewingYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState<CycleDay | null>(null);

  // Mock cycle data - in a real app this would come from the backend
  const cycleData = {
    averageCycleLength: 28,
    lastPeriodStart: new Date(2025, 4, 1), // May 1, 2025
    periodLength: 5,
    ovulationDay: 14,
    fertileWindowStart: 11,
    fertileWindowEnd: 16,
    symptoms: ["cramps", "bloating", "headache", "fatigue"],
    mood: ["irritable", "anxious", "emotional"],
    flow: ["light", "medium", "heavy", "medium", "light"],
  };

  // Calculate next predicted period
  const nextPeriodDate = new Date(cycleData.lastPeriodStart);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleData.averageCycleLength);

  // Generate month days
  const generateMonthDays = (month: number, year: number): CycleDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Calculate days to show from previous month to fill first week
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Calculate days from next month to show
    const lastDayOfWeek = lastDay.getDay();
    
    const days: CycleDay[] = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        day: prevMonthLastDay - i,
        date,
        status: "regular",
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      let status: CycleDay["status"] = "regular";
      
      // Calculate days since last period
      const lastPeriod = new Date(cycleData.lastPeriodStart);
      const daysSinceLastPeriod = Math.floor((date.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
      const cycleDay = (daysSinceLastPeriod % cycleData.averageCycleLength) + 1;
      
      if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < cycleData.periodLength) {
        status = "period";
      } else if (cycleDay === cycleData.ovulationDay) {
        status = "ovulation";
      } else if (cycleDay >= cycleData.fertileWindowStart && cycleDay <= cycleData.fertileWindowEnd) {
        status = "fertile";
      }
      
      // Next cycle (predicted)
      if (date > nextPeriodDate) {
        const daysSinceNextPeriod = Math.floor((date.getTime() - nextPeriodDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceNextPeriod >= 0 && daysSinceNextPeriod < cycleData.periodLength) {
          status = "predicted";
        }
      }
      
      days.push({
        day,
        date,
        status,
        selected: day === now.getDate() && month === now.getMonth() && year === now.getFullYear(),
      });
    }
    
    // Next month days
    for (let i = 1; i <= (6 - lastDayOfWeek); i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        day: i,
        date,
        status: "regular",
      });
    }
    
    return days;
  };

  const monthDays = generateMonthDays(viewingMonth, viewingYear);
  
  // Navigate to previous/next month
  const goToPrevMonth = () => {
    if (viewingMonth === 0) {
      setViewingMonth(11);
      setViewingYear(viewingYear - 1);
    } else {
      setViewingMonth(viewingMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (viewingMonth === 11) {
      setViewingMonth(0);
      setViewingYear(viewingYear + 1);
    } else {
      setViewingMonth(viewingMonth + 1);
    }
  };
  
  // Format dates
  const formatMonth = (month: number, year: number): string => {
    return new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handleDayClick = (day: CycleDay) => {
    setSelectedDay(day);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cycle Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your menstrual cycle and fertility windows
          </p>
        </div>
        <Button className="bg-fertility-500 hover:bg-fertility-600">
          <Plus className="mr-2 h-4 w-4" /> Log Today
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Cycle Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={goToPrevMonth}
                  title="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">{formatMonth(viewingMonth, viewingYear)}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={goToNextMonth}
                  title="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-xs font-medium py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, index) => {
                  // Determine appropriate styling based on status
                  let dayStyles = "h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors";
                  
                  if (day.date.getMonth() !== viewingMonth) {
                    dayStyles += " text-muted-foreground opacity-50";
                  } else {
                    switch (day.status) {
                      case "period":
                        dayStyles += " bg-fertility-400 text-white";
                        break;
                      case "fertile":
                        dayStyles += " bg-fertility-100 text-fertility-700";
                        break;
                      case "ovulation":
                        dayStyles += " bg-fertility-600 text-white";
                        break;
                      case "predicted":
                        dayStyles += " bg-fertility-200 text-fertility-800 border border-dashed border-fertility-400";
                        break;
                      default:
                        dayStyles += " hover:bg-muted";
                    }
                  }
                  
                  if (day.selected) {
                    dayStyles += " ring-2 ring-offset-2 ring-fertility-500";
                  }
                  
                  return (
                    <button
                      key={index}
                      className={dayStyles}
                      onClick={() => handleDayClick(day)}
                      disabled={day.date.getMonth() !== viewingMonth}
                    >
                      {day.day}
                    </button>
                  );
                })}
              </div>
              
              {/* Calendar Legend */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-fertility-400 mr-2"></div>
                  <span>Period</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-fertility-600 mr-2"></div>
                  <span>Ovulation</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-fertility-100 mr-2"></div>
                  <span>Fertile Window</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-fertility-200 border border-dashed border-fertility-400 mr-2"></div>
                  <span>Predicted Period</span>
                </div>
              </div>
              
              {/* Cycle Information */}
              <div className="mt-6 px-4 py-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">Cycle Length</div>
                    <div className="text-lg font-bold">{cycleData.averageCycleLength} days</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Period Length</div>
                    <div className="text-lg font-bold">{cycleData.periodLength} days</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Last Period</div>
                    <div className="text-lg font-bold">{cycleData.lastPeriodStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Next Period</div>
                    <div className="text-lg font-bold">{nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Cycle Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Phase */}
                <div className="bg-fertility-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg text-fertility-700">Fertile Window</div>
                    <Badge className="bg-fertility-500">Today</Badge>
                  </div>
                  <p className="text-sm mt-1 text-fertility-800">
                    Your fertility is currently high. This is an optimal time for conception.
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Cycle day:</span> 16
                    </div>
                    <div>
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      <span>Updated 2h ago</span>
                    </div>
                  </div>
                </div>
                
                {/* Wearable Data Integration */}
                <div>
                  <h4 className="font-medium mb-3">Wearable Insights</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-iatrohealth-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-iatrohealth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Basal Temperature</div>
                          <div className="text-sm flex items-center justify-between">
                            <span>98.6°F</span>
                            <span className="text-green-600">↑ 0.4°F</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-iatrohealth-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-iatrohealth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Resting Heart Rate</div>
                          <div className="text-sm flex items-center justify-between">
                            <span>68 bpm</span>
                            <span className="text-amber-600">↓ 3 bpm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-iatrohealth-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-iatrohealth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Sleep Quality</div>
                          <div className="text-sm flex items-center justify-between">
                            <span>7.2 hours</span>
                            <span className="text-green-600">Good</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Fertility Tips */}
                <div>
                  <h4 className="font-medium">Today's Tips</h4>
                  <div className="p-3 bg-iatrohealth-50 rounded-lg mt-2">
                    <p className="text-sm text-iatrohealth-800">
                      <span className="font-medium">High Fertility Day:</span> Consider timing
                      conception attempts today or tomorrow. Stay hydrated and 
                      avoid excessive caffeine.
                    </p>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Log Symptoms
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Update Intercourse Data
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Export Cycle Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cycle Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patterns" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patterns">Cycle Patterns</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
              <TabsTrigger value="insights">Fertility Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="patterns" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-medium">Cycle Length Trends</h4>
                <div className="h-48 bg-muted/50 rounded-lg flex items-end p-4 space-x-1">
                  {/* This would be an actual chart in a real app */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const height = 60 + Math.random() * 20;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-iatrohealth-400 rounded-t" 
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs mt-1 text-muted-foreground">
                          {new Date(2025, i, 1).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-muted-foreground">
                  Your cycle length has been consistent over the past 6 months, averaging {cycleData.averageCycleLength} days.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="symptoms" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cycleData.symptoms.map((symptom, i) => (
                    <div key={i} className="p-3 bg-muted rounded-lg text-center">
                      <span className="font-medium capitalize">{symptom}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Symptom Timeline</h4>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-fertility-600 bg-fertility-200">
                          Period
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-iatrohealth-600 bg-iatrohealth-200">
                          Ovulation
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                      <div style={{ width: "20%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-fertility-400">
                      </div>
                      <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-muted">
                      </div>
                      <div style={{ width: "5%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-iatrohealth-500">
                      </div>
                      <div style={{ width: "45%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-muted">
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="w-16 inline-block">Days 1-5:</span>
                      <span className="text-fertility-600">Cramps, Bloating</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 inline-block">Days 11-16:</span>
                      <span className="text-iatrohealth-600">Increased Discharge</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 inline-block">Day 14:</span>
                      <span className="text-iatrohealth-600">Mild Pain</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-16 inline-block">Days 24-28:</span>
                      <span className="text-muted-foreground">Fatigue, Breast Tenderness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-iatrohealth-50">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-iatrohealth-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-iatrohealth-700">Fertility Insights</h4>
                      <p className="text-sm mt-1 text-iatrohealth-700">
                        Based on your wearable data and cycle tracking, your fertility window is 
                        accurately predicted to be between cycle days 11-16. Your temperature 
                        shift confirms ovulation is likely occurring around day 14.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card className="border-iatrohealth-200">
                    <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-iatrohealth-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-iatrohealth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h5 className="font-medium">Basal Temperature</h5>
                      <p className="text-xs text-muted-foreground">Temperature rise confirms ovulation</p>
                    </CardContent>
                  </Card>
                  <Card className="border-iatrohealth-200">
                    <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-iatrohealth-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-iatrohealth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h5 className="font-medium">Cycle Length</h5>
                      <p className="text-xs text-muted-foreground">Consistent cycle improves prediction</p>
                    </CardContent>
                  </Card>
                  <Card className="border-iatrohealth-200">
                    <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-iatrohealth-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-iatrohealth-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h5 className="font-medium">Heart Rate</h5>
                      <p className="text-xs text-muted-foreground">Variations can indicate hormonal changes</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleTracker;
