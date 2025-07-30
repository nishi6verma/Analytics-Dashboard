"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";
import { SidebarNav } from "./SidebarNav";
import { BottomNav } from "./BottomNav";
import { cn } from "../../lib/cn";

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <>
      {/* Sidebar for md+ screens */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border flex flex-col shadow-lg",
          "hidden md:flex"
        )}
        aria-label="Sidebar navigation"
      >
        {/* Header: Toggle button + brand */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border select-none">
          <div
            className={cn(
              "flex items-center space-x-2",
              isCollapsed && "justify-center"
            )}
          >
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-600 to-red-500 font-bold text-lg ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              AMB
            </span>

            {!isCollapsed && (
              <span className="font-semibold text-lg">Navigation</span>
            )}
          </div>

          <button
            onClick={toggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "p-1.5 rounded-md bg-blue-800",
              "flex items-center justify-center"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" color="white" aria-hidden="true" />
            ) : (
              <ChevronLeft className="w-5 h-5" color="white" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Navigation area: scrollable */}
        <nav
          className="flex-1 overflow-y-auto px-2 py-4"
          aria-label="Primary navigation"
        >
          <SidebarNav />
        </nav>

        {/* Footer */}
        <footer className="px-4 py-3 border-t border-border text-xs text-muted-foreground select-none">
          {!isCollapsed && <p>© 2024 Ad Analytics</p>}
        </footer>
      </motion.aside>

      {/* Bottom navigation for mobile (sm-and-down) */}
      <BottomNav />
    </>
  );
}
