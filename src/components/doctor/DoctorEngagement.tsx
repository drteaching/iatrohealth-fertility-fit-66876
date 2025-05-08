
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Video, PhoneCall, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: Date;
}

const DoctorEngagement = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Reproductive Endocrinologist",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Nutrition Specialist",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "doctor",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      text: "I've been tracking my cycle and have a question about my fertility window.",
      sender: "user",
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000)
    },
    {
      id: "3",
      text: "Great! Can you share your tracking data with me so I can take a look?",
      sender: "doctor",
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000)
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message is empty",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate doctor response after a delay
    setTimeout(() => {
      const doctorReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing that information. Let me review your data and get back to you shortly.",
        sender: "doctor",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, doctorReply]);
    }, 2000);
  }

  const startVideoCall = () => {
    setShowVideoCall(true);
    toast({
      title: "Video call started",
      description: "Connected with Dr. Sarah Johnson",
    });
  }

  const endVideoCall = () => {
    setShowVideoCall(false);
    toast({
      title: "Call ended",
      description: "Video call with Dr. Sarah Johnson has ended.",
    });
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Doctor Communication</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctors List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">My Doctors</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className="p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setActiveDoctor(doctor)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage 
                        src={doctor.imageUrl} 
                        alt={doctor.name} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Doctor";
                        }}
                      />
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={doctors[0].imageUrl} 
                    alt={doctors[0].name} 
                  />
                  <AvatarFallback>{doctors[0].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{doctors[0].name}</CardTitle>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={startVideoCall}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <PhoneCall className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            {/* Video Call View (conditionally rendered) */}
            {showVideoCall && (
              <div className="relative flex-1 bg-black flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg mb-2">Video Call with Dr. Sarah Johnson</h3>
                  <p className="text-sm opacity-75 mb-6">Connected</p>
                  <Button onClick={endVideoCall} variant="destructive">
                    End Call
                  </Button>
                  
                  {/* Small self-view */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-600 rounded-md flex items-center justify-center">
                    <span className="text-xs text-white/60">You</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Chat Messages */}
            {!showVideoCall && (
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            
            {/* Message Input */}
            {!showVideoCall && (
              <div className="p-4 border-t flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorEngagement;
