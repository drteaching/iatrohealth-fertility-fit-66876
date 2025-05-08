
import { useState } from "react";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Pill } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Medication name must be at least 2 characters.",
  }),
  dosage: z.string().min(1, {
    message: "Please specify the dosage.",
  }),
  frequency: z.string().min(1, {
    message: "Please specify how often you take this medication.",
  }),
  time: z.string().min(1, {
    message: "Please specify what time you take this medication.",
  }),
});

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}

const MedicationTracker = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { 
      id: "1", 
      name: "Prenatal Vitamins", 
      dosage: "1 tablet", 
      frequency: "Daily", 
      time: "Morning" 
    },
    { 
      id: "2", 
      name: "Folic Acid", 
      dosage: "400mcg", 
      frequency: "Daily", 
      time: "Morning" 
    },
  ]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "Daily",
      time: "Morning",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new medication with all required fields explicitly typed
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: values.name,
      dosage: values.dosage,
      frequency: values.frequency,
      time: values.time
    };
    
    setMedications([...medications, newMedication]);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Medication added",
      description: `${values.name} has been added to your medication list.`,
    });
  };

  const handleTaken = (id: string) => {
    toast({
      title: "Medication taken",
      description: "Great job staying on track with your medication!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-medium">Medication Tracker</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mt-2 sm:mt-0">Add Medication</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter medication name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10mg, 1 tablet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Daily, Twice a day" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time of Day</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Morning, Evening" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Medication</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medications.map((med) => (
          <Card key={med.id} className="border border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Pill className="h-5 w-5 mr-2 text-primary" />
                {med.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium text-foreground">Dosage</p>
                    <p>{med.dosage}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Frequency</p>
                    <p>{med.frequency}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Time</p>
                    <p>{med.time}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleTaken(med.id)}
              >
                Mark as Taken
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicationTracker;
