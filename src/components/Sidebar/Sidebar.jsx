import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import {
  MoonIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { Switch } from "../ui/switch";

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

export const Sidebar = ({ isOpen, onClose, isDarkMode, onThemeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
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

      {/* Navigation Menu - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-2.5 w-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={`flex items-center w-full h-10 rounded-[32px] px-[13px] cursor-pointer transition-colors duration-200 ${
                  isActive 
                    ? "bg-[#066320] text-white" 
                    : "hover:bg-muted"
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-foreground"
                  }`}
                />
                <div className="ml-[32px] font-['Montserrat'] font-semibold text-sm leading-[21px]">
                  <span className={isActive ? "text-white" : "text-foreground"}>
                    {item.name}
                  </span>
                </div>
                {item.hasDropdown && (
                  <ChevronRightIcon className={`w-5 h-5 ml-auto ${
                    isActive ? "text-white" : "text-foreground"
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