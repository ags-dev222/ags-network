import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { SearchIcon, Menu, X } from "lucide-react";
import {
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  GlobeAltIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

const navigationItems = [
  { name: "Home", icon: HomeIcon, path: "/" },
  { name: "Dashboard", icon: ChartBarIcon, path: "/dashboard" },
  { name: "Curated content", icon: BookOpenIcon, path: "/curated-content" },
  { name: "Membership", icon: UserGroupIcon, path: "/membership" },
  { name: "Startup Companies", icon: BuildingOfficeIcon, path: "/startup-companies" },
  {
    name: "Investors & Funding",
    icon: BanknotesIcon,
    path: "/investors-funding",
    hasDropdown: true,
  },
  { name: "Investment heatmap", icon: GlobeAltIcon, path: "/investment-heatmap" },
];

const Navbar = ({ onMenuClick }) => (
  <header className="h-[82px] border-b border-border flex items-center justify-between px-6 bg-background">
    <button
      className="lg:hidden p-2 rounded-md"
      onClick={onMenuClick}
    >
      <Menu className="w-6 h-6" />
    </button>

    <div className="flex-1 max-w-[468px] mx-4 lg:ml-[364px]">
      <div className="relative">
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <SearchIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <Input
          className="w-full h-10 pl-10 rounded shadow-[0px_0px_2px_#00000033] font-['Montserrat'] text-foreground"
          placeholder="Search for StartUps, Companies, etc"
        />
      </div>
    </div>

    <div className="flex gap-[26px]">
      <Button
        variant="outline"
        className="h-9 w-[59px] font-['Source_Sans_3'] font-semibold text-sm text-foreground border-border"
      >
        Login
      </Button>
      <Button className="h-9 w-[69px] font-['Source_Sans_3'] font-semibold text-sm bg-[#066320]">
        Sign up
      </Button>
    </div>
  </header>
);

const Sidebar = ({ isOpen, onClose, isDarkMode, onThemeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <aside className={`
      fixed lg:relative w-[286px] h-screen bg-background
      flex flex-col border-r border-border
      transform lg:transform-none transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      z-40 lg:z-auto
    `}>
      {/* Close button for mobile */}
      <button
        className="lg:hidden absolute top-4 right-4 p-2 rounded-md"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Logo */}
      <div className="w-[180px] h-[118px] flex items-center mx-4">
        <img
          className="w-[auto] h-[Auto] object-cover"
          alt="AGS LOGO"
          src="/logo.png"
        />
      </div>

      {/* Navigation Menu - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-2.5 w-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                className={`flex items-center w-full h-10 rounded-[32px] px-[13px] cursor-pointer hover:bg-muted ${
                  location.pathname === item.path ? "bg-[#066320]" : ""
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    location.pathname === item.path ? "text-white" : "text-foreground"
                  }`}
                />
                <div className="ml-[32px] font-['Montserrat'] font-semibold text-sm leading-[21px]">
                  <span className={location.pathname === item.path ? "text-white" : "text-foreground"}>
                    {item.name}
                  </span>
                </div>
                {item.hasDropdown && (
                  <ChevronRightIcon className={`w-5 h-5 ml-auto ${
                    location.pathname === item.path ? "text-white" : "text-foreground"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section - Fixed */}
      <div className="px-4 py-6 border-t border-border mt-auto">
        <div className="flex items-center justify-between px-7 py-3.5 bg-muted rounded-[31px] mb-4">
          <div className="flex items-center gap-1.5">
            <MoonIcon className="w-5 h-5" />
            <span className="font-['Sora'] text-foreground text-sm">
              Night Theme
            </span>
          </div>
          <Switch 
            checked={isDarkMode}
            onCheckedChange={onThemeChange}
            className="bg-foundation-greennormal" 
          />
        </div>

        <div className="flex items-center gap-3 px-7 py-3.5 bg-muted rounded-[32px] cursor-pointer">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="font-['Sora'] text-foreground text-xs tracking-[0.18px]">
            Logout
          </span>
        </div>
      </div>
    </aside>
  );
};

export const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`flex bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onThemeChange={setIsDarkMode}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};