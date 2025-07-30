import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { campaigns } from "../data/campaigns";
import { formatCurrency, formatPercentage } from "../lib/utils";
import {
  Target,
  Play,
  Pause,
  Plus,
  Grid,
  List,
} from "lucide-react";
import { cn } from "../lib/cn";

export function Campaigns() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />;
      case "paused":
        return <Pause className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <PageHeader
        title="Campaigns"
        subtitle="Manage and monitor your advertising campaigns"
      />
      <div className="flex justify-between pb-4 items-center">
        <div className="flex items-center space-x-2 bg-accent rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            )}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-background shadow-sm"
                : "hover:bg-background/50"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => navigate(`/analytics?campaignId=${campaign.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <div
                      className={cn(
                        "inline-flex items-center space-x-1 px-2 py-1 h-7 rounded-full text-xs font-medium mt-1",
                        getStatusColor(campaign.status)
                      )}
                    >
                      {getStatusIcon(campaign.status)}
                      <span className="capitalize">{campaign.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">CTR</span>
                  <span className="font-semibold text-green-600">
                    {formatPercentage(campaign.ctr)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Spent</span>
                  <span className="font-semibold">
                    {formatCurrency(campaign.spent)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="font-semibold">
                    {formatCurrency(campaign.budget)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Conversions
                  </span>
                  <span className="font-semibold">
                    {campaign.conversions.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Budget Used</span>
                  <span>
                    {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-accent rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (campaign.spent / campaign.budget) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Campaign</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Budget</th>
                  <th className="text-left p-4 font-semibold">Spent</th>
                  <th className="text-left p-4 font-semibold">CTR</th>
                  <th className="text-left p-4 font-semibold">Conversions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <motion.tr
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border hover:bg-accent/30 transition-colors cursor-pointer"
                    onClick={() =>
                      navigate(`/analytics?campaignId=${campaign.id}`)
                    }
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{campaign.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className={cn(
                          "inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                          getStatusColor(campaign.status)
                        )}
                      >
                        {getStatusIcon(campaign.status)}
                        <span className="capitalize">{campaign.status}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      {formatCurrency(campaign.budget)}
                    </td>
                    <td className="p-4 font-medium">
                      {formatCurrency(campaign.spent)}
                    </td>
                    <td className="p-4 font-medium text-green-600">
                      {formatPercentage(campaign.ctr)}
                    </td>
                    <td className="p-4 font-medium">
                      {campaign.conversions.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </Container>
  );
}
