
import React, { useState } from "react";
import { Activity, Clock, Calendar, Plus, Video, Clock as ClockIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for workout program
const workoutProgram = {
  name: "Fertility-Friendly Weight Management",
  description: "A personalized program designed to help you reach your ideal weight while supporting fertility.",
  coach: {
    name: "Dr. Sarah Miller",
    title: "Fertility Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  currentWeek: 4,
  totalWeeks: 12,
  completedWorkouts: 22,
  totalWorkouts: 36,
  weeklyGoal: 3,
  currentWeekCompleted: 1
};

// Mock workout data
const upcomingWorkouts = [
  {
    id: 1,
    name: "Low-Impact Cardio",
    type: "cardio",
    duration: "30 min",
    difficulty: "moderate",
    scheduled: "Today, 5:30 PM",
    exercises: [
      { name: "Warm-Up", duration: "5 min" },
      { name: "Walking Intervals", duration: "15 min" },
      { name: "Step Touches", duration: "5 min" },
      { name: "Cool Down", duration: "5 min" }
    ],
    videoUrl: "https://example.com/video1",
    thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Strength & Stability",
    type: "strength",
    duration: "35 min",
    difficulty: "moderate",
    scheduled: "Tomorrow, 9:00 AM",
    exercises: [
      { name: "Dynamic Warm-Up", duration: "5 min" },
      { name: "Bodyweight Squats", duration: "5 min" },
      { name: "Modified Push-Ups", duration: "5 min" },
      { name: "Glute Bridges", duration: "5 min" },
      { name: "Planks", duration: "5 min" },
      { name: "Cool Down", duration: "5 min" }
    ],
    videoUrl: "https://example.com/video2",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Gentle Yoga Flow",
    type: "flexibility",
    duration: "25 min",
    difficulty: "easy",
    scheduled: "Thursday, 7:00 PM",
    exercises: [
      { name: "Breathing Exercises", duration: "3 min" },
      { name: "Sun Salutations", duration: "7 min" },
      { name: "Standing Poses", duration: "7 min" },
      { name: "Floor Sequences", duration: "5 min" },
      { name: "Final Relaxation", duration: "3 min" }
    ],
    videoUrl: "https://example.com/video3",
    thumbnail: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const completedWorkouts = [
  {
    id: 4,
    name: "Morning Mobility",
    type: "flexibility",
    duration: "20 min",
    completed: "Yesterday",
    calories: 120,
    heartRate: 115,
    thumbnail: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Cardio & Core",
    type: "cardio",
    duration: "30 min",
    completed: "Monday",
    calories: 210,
    heartRate: 135,
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    name: "Full-Body Strength",
    type: "strength",
    duration: "40 min",
    completed: "Last Saturday",
    calories: 260,
    heartRate: 128,
    thumbnail: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const ExerciseProgram = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(upcomingWorkouts[0]);
  const [showDetails, setShowDetails] = useState(false);

  // Format workout intensity with helpers
  const getIntensityColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "moderate": return "bg-amber-100 text-amber-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  // Format workout type with helpers
  const getWorkoutTypeIcon = (type: string) => {
    switch (type) {
      case "cardio":
        return <Activity className="h-4 w-4" />;
      case "strength":
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h8M8 18V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12M8 9h8M8 13h8"></path></svg>;
      case "flexibility":
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6a2 2 0 0 0 0 3.64l8.57 3.82a2 2 0 0 0 1.66 0L21.4 9.64a2 2 0 0 0 0-3.64z"></path><path d="M22 13c0 1.1-.9 2-2 2h-2a2 2 0 0 1-2-2"></path><path d="M6 13c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2"></path><path d="M2 2v20"></path><path d="M22 2v20"></path></svg>;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Exercise Program</h1>
          <p className="text-muted-foreground">
            Personalized workouts tailored for fertility and weight management
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Schedule Workout
        </Button>
      </div>

      {/* Program Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle>{workoutProgram.name}</CardTitle>
              <CardDescription>{workoutProgram.description}</CardDescription>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img 
                  src={workoutProgram.coach.image} 
                  alt={workoutProgram.coach.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium">{workoutProgram.coach.name}</div>
                <div className="text-xs text-muted-foreground">{workoutProgram.coach.title}</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-sm">Program Progress</div>
              <div className="flex justify-between text-xs mb-1">
                <span>Week {workoutProgram.currentWeek} of {workoutProgram.totalWeeks}</span>
                <span>{Math.round((workoutProgram.currentWeek / workoutProgram.totalWeeks) * 100)}%</span>
              </div>
              <Progress value={(workoutProgram.currentWeek / workoutProgram.totalWeeks) * 100} />
              <div className="text-xs text-muted-foreground mt-1">
                {workoutProgram.totalWeeks - workoutProgram.currentWeek} weeks remaining
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">Workout Completion</div>
              <div className="flex justify-between text-xs mb-1">
                <span>{workoutProgram.completedWorkouts} of {workoutProgram.totalWorkouts} completed</span>
                <span>{Math.round((workoutProgram.completedWorkouts / workoutProgram.totalWorkouts) * 100)}%</span>
              </div>
              <Progress value={(workoutProgram.completedWorkouts / workoutProgram.totalWorkouts) * 100} />
              <div className="text-xs text-muted-foreground mt-1">
                {workoutProgram.totalWorkouts - workoutProgram.completedWorkouts} workouts remaining
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">This Week's Progress</div>
              <div className="flex justify-between text-xs mb-1">
                <span>{workoutProgram.currentWeekCompleted} of {workoutProgram.weeklyGoal} workouts</span>
                <span>{Math.round((workoutProgram.currentWeekCompleted / workoutProgram.weeklyGoal) * 100)}%</span>
              </div>
              <Progress value={(workoutProgram.currentWeekCompleted / workoutProgram.weeklyGoal) * 100} />
              <div className="text-xs text-muted-foreground mt-1">
                {workoutProgram.weeklyGoal - workoutProgram.currentWeekCompleted} more to reach your weekly goal
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className={showDetails ? "hidden lg:block" : ""}>
            <CardHeader>
              <CardTitle>Upcoming Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingWorkouts.map((workout) => (
                  <div 
                    key={workout.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedWorkout.id === workout.id ? 'border-iatrohealth-400 bg-iatrohealth-50/50' : 'hover:border-muted-foreground'
                    }`}
                    onClick={() => {
                      setSelectedWorkout(workout);
                      if (window.innerWidth < 1024) { // lg breakpoint
                        setShowDetails(true);
                      }
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-12 rounded-full mr-4 ${
                          workout.type === 'cardio' ? 'bg-green-500' :
                          workout.type === 'strength' ? 'bg-amber-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div>
                          <div className="font-medium">{workout.name}</div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {workout.duration}
                            </span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {workout.scheduled}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center space-x-2">
                        <Badge variant="outline" className={getIntensityColor(workout.difficulty)}>
                          {workout.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center">
                          {getWorkoutTypeIcon(workout.type)}
                          <span className="ml-1 capitalize">{workout.type}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={!showDetails ? "hidden lg:block" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{selectedWorkout.name}</CardTitle>
                <CardDescription>{selectedWorkout.scheduled}</CardDescription>
              </div>
              <div className="lg:hidden">
                <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden bg-muted aspect-video relative group">
                  <img 
                    src={selectedWorkout.thumbnail} 
                    alt={selectedWorkout.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button>
                      <Video className="mr-2 h-4 w-4" /> Play Video
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getIntensityColor(selectedWorkout.difficulty)}>
                    {selectedWorkout.difficulty} intensity
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    {getWorkoutTypeIcon(selectedWorkout.type)}
                    <span className="ml-1 capitalize">{selectedWorkout.type}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {selectedWorkout.duration}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Workout Description</h3>
                  <p className="text-sm text-muted-foreground">
                    This {selectedWorkout.type} workout is designed to support your fertility journey by focusing 
                    on moderate intensity exercise that helps with weight management without causing excess stress 
                    to your body.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Exercise Breakdown</h3>
                  <div className="space-y-2">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="flex justify-between p-2 bg-muted/50 rounded">
                        <div className="text-sm">{index + 1}. {exercise.name}</div>
                        <div className="text-sm text-muted-foreground">{exercise.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-iatrohealth-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={workoutProgram.coach.image} 
                        alt={workoutProgram.coach.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Coach's Note</div>
                      <div className="text-xs text-iatrohealth-700">
                        Remember to focus on form over intensity. If you feel any discomfort, modify the exercise or take a break.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                Schedule for Later
              </Button>
              <Button>
                Start Workout
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="history">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="space-y-4 mt-4">
                  {completedWorkouts.map((workout) => (
                    <div key={workout.id} className="flex items-center space-x-3 p-2 rounded border">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={workout.thumbnail} 
                          alt={workout.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{workout.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {workout.completed} • {workout.duration}
                        </div>
                        <div className="flex items-center space-x-3 mt-1 text-xs">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.45 13.5l-7.95 7L2 13.24V6.2L11.5 2l9.5 4.12v7.38z"></path></svg>
                            {workout.calories} cal
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            {workout.heartRate} bpm
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    View All History
                  </Button>
                </TabsContent>

                <TabsContent value="stats" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm">Weekly Activity</div>
                      <div className="grid grid-cols-7 gap-1">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs">{day}</div>
                            <div 
                              className={`mt-1 h-16 w-full rounded ${
                                i <= 2 ? 'bg-iatrohealth-100' : 'bg-muted'
                              }`}
                            >
                              {i <= 2 && (
                                <div 
                                  className="bg-iatrohealth-400 h-full rounded" 
                                  style={{ 
                                    width: "100%",
                                    height: `${30 + (i * 20)}%`
                                  }}
                                ></div>
                              )}
                            </div>
                            <div className="text-xs mt-1">
                              {i <= 2 ? "✓" : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Workouts This Week</div>
                        <div className="text-xl font-bold">3</div>
                        <div className="flex items-center text-xs text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                          +1 from last week
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Active Minutes</div>
                        <div className="text-xl font-bold">95</div>
                        <div className="flex items-center text-xs text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                          +15 from last week
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Calories Burned</div>
                        <div className="text-xl font-bold">590</div>
                        <div className="flex items-center text-xs text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                          +45 from last week
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Avg Heart Rate</div>
                        <div className="text-xl font-bold">126</div>
                        <div className="flex items-center text-xs text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                          No change
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-3">Your Progress</h4>
                      <div className="text-xs text-muted-foreground mb-1">
                        Based on your weight loss goal of 3.6 kg:
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>1.0 kg lost</span>
                        <span>29% of goal</span>
                      </div>
                      <Progress value={29} className="h-1.5" />
                      <div className="text-xs text-muted-foreground mt-2">
                        You're on track to reach your goal in approximately 7 weeks.
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExerciseProgram;
