
import React, { useState } from "react";
import { Camera, Plus, ArrowUp, ArrowDown, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for meal entries
const mockMeals = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    time: "8:30 AM",
    name: "Breakfast",
    calories: 420,
    carbs: 45,
    protein: 22,
    fat: 15,
    items: ["Greek yogurt", "Granola", "Berries", "Honey"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    time: "12:15 PM",
    name: "Lunch",
    calories: 580,
    carbs: 65,
    protein: 30,
    fat: 18,
    items: ["Grilled chicken salad", "Quinoa", "Avocado", "Olive oil dressing"]
  },
  {
    id: 3,
    image: null, // No image yet
    time: "4:00 PM",
    name: "Snack",
    calories: 180,
    carbs: 15,
    protein: 5,
    fat: 12,
    items: ["Almonds", "Apple"]
  }
];

const CalorieTracker = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [meals, setMeals] = useState(mockMeals);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Mock calorie goals and stats
  const calorieGoal = 2000;
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  // Handle file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock photo analysis
  const analyzePhoto = () => {
    // In a real app, this would send the image to an AI service
    alert("In a real app, this would analyze the meal photo and estimate calories and nutrients");
    setPreviewImage(null);
  };

  const handleAddMeal = () => {
    // This would normally open a form or modal
    alert("In a real app, this would allow you to add a meal manually or by photo");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nutrition Tracking</h1>
          <p className="text-muted-foreground">
            Track your meals and manage your daily calorie intake
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => document.getElementById("upload-photo")?.click()}>
            <Camera className="mr-2 h-4 w-4" /> Photo Log
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageChange}
            />
          </Button>
          <Button onClick={handleAddMeal}>
            <Plus className="mr-2 h-4 w-4" /> Add Meal
          </Button>
        </div>
      </div>

      {/* Photo Preview and Analysis */}
      {previewImage && (
        <Card>
          <CardHeader>
            <CardTitle>Analyze Your Meal</CardTitle>
            <CardDescription>
              We'll estimate the calories and nutrients in your meal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center">
              <img 
                src={previewImage} 
                alt="Meal preview" 
                className="rounded-lg max-h-64 object-cover"
              />
              <Button onClick={analyzePhoto} className="mt-4">
                Analyze Photo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calorie Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4 mt-4">
                {/* Daily Calorie Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Calories Consumed</div>
                      <div className="text-2xl font-bold">{totalCalories} / {calorieGoal}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Remaining</div>
                      <div className={`text-xl font-bold ${(calorieGoal - totalCalories) < 0 ? 'text-red-500' : 'text-green-600'}`}>
                        {calorieGoal - totalCalories}
                      </div>
                    </div>
                  </div>
                  <Progress value={(totalCalories / calorieGoal) * 100} className="h-2" />
                </div>

                {/* Macro Breakdown */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-medium mb-1 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-iatrohealth-500 mr-2"></span>
                      Carbs
                    </div>
                    <div className="text-xl font-bold">{totalCarbs}g</div>
                    <div className="text-xs text-muted-foreground">{Math.round((totalCarbs * 4 / totalCalories) * 100)}% of calories</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-medium mb-1 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-fertility-500 mr-2"></span>
                      Protein
                    </div>
                    <div className="text-xl font-bold">{totalProtein}g</div>
                    <div className="text-xs text-muted-foreground">{Math.round((totalProtein * 4 / totalCalories) * 100)}% of calories</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-medium mb-1 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                      Fat
                    </div>
                    <div className="text-xl font-bold">{totalFat}g</div>
                    <div className="text-xs text-muted-foreground">{Math.round((totalFat * 9 / totalCalories) * 100)}% of calories</div>
                  </div>
                </div>

                {/* Today's Meals */}
                <div className="space-y-4 mt-6">
                  <h3 className="font-medium">Today's Meals</h3>
                  
                  {meals.map((meal) => (
                    <Card key={meal.id}>
                      <CardContent className="p-4">
                        <div className="flex">
                          <div className="mr-4 flex-shrink-0">
                            {meal.image ? (
                              <img 
                                src={meal.image} 
                                alt={meal.name} 
                                className="h-20 w-20 rounded-md object-cover"
                              />
                            ) : (
                              <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <div className="text-xs text-muted-foreground">{meal.time}</div>
                                <div className="font-medium">{meal.name}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold">{meal.calories} cal</div>
                              </div>
                            </div>
                            <div className="mt-1">
                              <div className="text-xs text-muted-foreground">
                                {meal.items.join(", ")}
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-3 gap-2">
                              <div className="text-xs">
                                <span className="text-muted-foreground">Carbs:</span> {meal.carbs}g
                              </div>
                              <div className="text-xs">
                                <span className="text-muted-foreground">Protein:</span> {meal.protein}g
                              </div>
                              <div className="text-xs">
                                <span className="text-muted-foreground">Fat:</span> {meal.fat}g
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="week" className="mt-4">
                <div className="h-64 bg-muted/50 rounded-lg flex items-end p-4 space-x-3">
                  {/* This would be an actual chart in a real app */}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const height = 30 + Math.random() * 40;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-iatrohealth-400 rounded-t" 
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs mt-1 text-muted-foreground">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-muted-foreground">Weekly Average</div>
                  <div className="text-xl font-bold">1,850 calories/day</div>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="font-medium">Calorie Balance</div>
                    <div className="mt-4 grid grid-cols-7 gap-1">
                      {["1", "2", "3", "4", "5", "6", "7"].map((day, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xs">{day}</div>
                          <div className="mt-1 flex flex-col space-y-1 items-center">
                            <div 
                              className="w-full bg-green-400 rounded"
                              style={{ 
                                height: `${Math.max(20, Math.random() * 30 + 10)}px` 
                              }}
                            ></div>
                            <div 
                              className="w-full bg-iatrohealth-400 rounded"
                              style={{ 
                                height: `${Math.max(20, Math.random() * 30 + 20)}px` 
                              }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-center mt-1 text-xs">
                            {Math.random() > 0.5 ? (
                              <ArrowDown className="h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowUp className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                        <span>Calories burned</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-iatrohealth-400 rounded-full mr-1"></div>
                        <span>Calories consumed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <div className="font-medium">Macronutrient Distribution</div>
                    <div className="mt-4 flex items-center">
                      <div className="h-28 w-28 rounded-full border-8 border-iatrohealth-400 relative mr-4">
                        <div 
                          className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-8 border-fertility-500"
                          style={{ 
                            clip: 'rect(0px, 56px, 112px, 0px)',
                          }}
                        ></div>
                        <div 
                          className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-8 border-amber-500"
                          style={{ 
                            clip: 'rect(0px, 112px, 112px, 56px)',
                          }}
                        ></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-iatrohealth-500 mr-2"></div>
                              <span>Carbs</span>
                            </div>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-fertility-500 mr-2"></div>
                              <span>Protein</span>
                            </div>
                            <span>25%</span>
                          </div>
                          <Progress value={25} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                              <span>Fat</span>
                            </div>
                            <span>30%</span>
                          </div>
                          <Progress value={30} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Add</CardTitle>
              <CardDescription>Log meals or items quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search-food">Search Food</Label>
                  <Input id="search-food" placeholder="Search food database..." />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span>Photo Log</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Plus className="h-6 w-6 mb-1" />
                    <span>Custom Meal</span>
                  </Button>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Recent Items</h4>
                  <div className="space-y-2">
                    {["Greek yogurt", "Chicken breast", "Mixed salad", "Protein shake"].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">{item}</span>
                        <Button size="icon" variant="ghost">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-iatrohealth-50 rounded-lg border border-iatrohealth-100">
                  <h4 className="font-medium text-iatrohealth-700 mb-1">Fertility-Friendly Foods</h4>
                  <p className="text-sm text-iatrohealth-700">
                    Try to increase your intake of foods rich in folate, like 
                    dark leafy greens, citrus fruits, and beans.
                  </p>
                </div>
                
                <div className="p-3 bg-iatrohealth-50 rounded-lg border border-iatrohealth-100">
                  <h4 className="font-medium text-iatrohealth-700 mb-1">Today's Goal</h4>
                  <p className="text-sm text-iatrohealth-700">
                    Aim for at least 25g of fiber today to support digestive health
                    and help manage blood sugar levels.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Weekly Progress</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Calories</span>
                        <span>1,850 / 2,000 avg</span>
                      </div>
                      <Progress value={92.5} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Protein</span>
                        <span>85g / 100g avg</span>
                      </div>
                      <Progress value={85} className="h-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Water</span>
                        <span>6 / 8 cups avg</span>
                      </div>
                      <Progress value={75} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;
