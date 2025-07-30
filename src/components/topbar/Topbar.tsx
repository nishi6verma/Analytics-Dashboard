import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import admybrandLogo from "../../../images/admybrand.svg";

export function Topbar() {
  const navigate = useNavigate();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <img src={admybrandLogo} alt="Admybrand Logo" />
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <button className="p-2 rounded-md hover:bg-accent transition-colors" onClick={() => navigate("/settings")}>
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.header>
  );
}
