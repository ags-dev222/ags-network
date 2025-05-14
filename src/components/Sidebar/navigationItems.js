import {
  HomeIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export const navigationItems = [
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