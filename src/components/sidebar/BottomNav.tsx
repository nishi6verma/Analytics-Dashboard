"use client";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../constants/navItems";
import { cn } from "../../lib/cn";
import { motion } from "framer-motion";

// Add this to the *end* of your layout (after content), so it's positioned above everything else, z-50!
export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border h-full",
        "flex justify-between items-center px-2 md:hidden h-16 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
      )}
      role="navigation"
      aria-label="Bottom navigation"
    >
      {navItems.map((item, i) => {
        // Use same logic as your SIDEBAR for active state
        const isActive =
          location.pathname === item.href ||
          (item.href === "/dashboard" && location.pathname === "/");

        return (
          <motion.div
            key={item.href}
            className="relative flex flex-1 items-center justify-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full py-1 px-0 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
              tabIndex={0}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Icon */}
              <item.icon
                className={cn(
                  "w-6 h-6 mb-0.5",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
              {/* Label */}
              <span className="text-xs font-medium">{item.title}</span>
              {/* Badge */}
              {item.badge && (
                <span
                  className={cn(
                    // position badge as a mini circle near top/right of icon
                    "absolute -top-0.5 right-[18%] min-w-[1.3rem] h-5 rounded-full",
                    "bg-primary text-primary-foreground text-[10px] leading-5 font-semibold flex items-center justify-center px-1.5 shadow"
                  )}
                  aria-label={
                    typeof item.badge === "number"
                      ? `${item.badge} new`
                      : item.badge
                  }
                >
                  {item.badge}
                </span>
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
