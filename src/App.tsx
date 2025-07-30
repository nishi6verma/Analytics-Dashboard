import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme-provider";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import { useSidebar } from "./hooks/useSidebar";
import { Dashboard } from "./routes/dashboard";
import { Reports } from "./routes/reports";
import { Campaigns } from "./routes/campaigns";
import { Audience } from "./routes/audience";
import { Analytics } from "./routes/analytics";
import { Settings } from "./routes/settings";

function AppContent() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? "md:ml-16" : "md:ml-64"
        } pb-16 md:pb-0`}
      >
        <Topbar />
        <main className="max-w-[100vw] flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
