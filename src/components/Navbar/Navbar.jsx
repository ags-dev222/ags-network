import { SearchIcon, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Navbar = ({ onMenuClick }) => (
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