"use client"

import { motion } from "framer-motion"
import { useLocation, Link } from "react-router-dom"
import { navItems } from "../../constants/navItems"
import { useSidebar } from "../../hooks/useSidebar"
import { cn } from "../../lib/cn"

export function SidebarNav() {
  const location = useLocation()
  const { isCollapsed } = useSidebar()

  return (
    <nav
      className={cn(
        "flex flex-col h-full transition-all gap-4",
        isCollapsed ? "items-center px-0" : "items-stretch px-3"
      )}
      aria-label="Sidebar links"
    >
      {navItems.map((item, index) => {
        const isActive =
          location.pathname === item.href ||
          (item.href === "/dashboard" && location.pathname === "/")

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "w-full",
              isCollapsed && "flex justify-center"
            )}
          >
            <Link
              to={item.href}
              className={cn(
                "flex items-center transition-all duration-200 relative group my-1 rounded-lg",
                isCollapsed
                  ? "justify-center w-12 h-12 p-0"
                  : "justify-start w-full px-3 py-2.5 space-x-3",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon */}
              <item.icon
                className={cn(
                  "w-6 h-6 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground group-hover:text-accent-foreground"
                )}
                aria-hidden="true"
              />

              {/* Label, only when expanded */}
              {!isCollapsed && (
                <motion.span
                  initial={false}
                  animate={{
                    opacity: 1,
                    width: "auto"
                  }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-lg overflow-hidden whitespace-nowrap"
                >
                  {item.title}
                </motion.span>
              )}

              {/* Badge, only when expanded */}
              {item.badge && !isCollapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full"
                >
                  {item.badge}
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                  {item.badge && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          </motion.div>
        )
      })}
    </nav>
  )
}
