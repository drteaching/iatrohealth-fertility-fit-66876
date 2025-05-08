
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, BellRing, Pill, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Cycle Tracking", path: "/cycle" },
    { label: "Nutrition", path: "/nutrition" },
    { label: "Exercise", path: "/exercise" },
    { label: "Devices", path: "/devices" },
    { label: "Medications", path: "/devices", icon: Pill },
    { label: "Doctor Chat", path: "/devices", icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-iatrohealth-500 to-fertility-400 flex items-center justify-center">
              <span className="font-bold text-white text-lg">I</span>
            </div>
            <span className="hidden md:inline-block font-bold text-xl text-iatrohealth-600">
              IatroHealth
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path + item.label}
              to={item.path}
              className="text-sm font-medium transition-colors hover:text-iatrohealth-500 flex items-center"
            >
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Notifications"
          >
            <BellRing className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-iatrohealth-100 text-iatrohealth-700">
              JD
            </AvatarFallback>
          </Avatar>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6 pt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path + item.label}
                    to={item.path}
                    className="text-lg font-medium transition-colors hover:text-iatrohealth-500 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
