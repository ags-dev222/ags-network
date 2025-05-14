import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

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