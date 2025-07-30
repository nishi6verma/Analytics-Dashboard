import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Target, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { StatCard } from "../components/cards/StatCard";
import { TrendCard } from "../components/cards/TrendCard";
import { AreaChart } from "../components/charts/AreaChart";
import { PieChart } from "../components/charts/PieChart";
import { dashboardMetrics, trendData, performanceData } from "../data/metrics";
import { campaigns } from "../data/campaigns";
import { Button } from "@ui/button";
import { DateRangePicker } from "@/components/filters/DateRangePicker";

export function Dashboard() {
  const navigate = useNavigate();
  const topCampaigns = campaigns.slice(0, 3);

  const [isExporting, setIsExporting] = useState(false);

  // Enhanced export function
  async function exportDashboardPDF() {
    setIsExporting(true);

    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header with logo and title
      doc.setFillColor(59, 130, 246); // Blue header
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text("Campaign Performance Report", 20, 25);

      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 35);

      let yPos = 60;

      // KPI Summary Section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.text("Key Performance Indicators", 20, yPos);
      yPos += 15;

      // Add KPI cards in a grid
      dashboardMetrics.forEach((metric, index) => {
        const xPos = 20 + (index % 2) * 90;
        if (index % 2 === 0 && index > 0) yPos += 25;

        doc.setFillColor(248, 250, 252);
        doc.rect(xPos, yPos, 80, 20, "F");
        doc.rect(xPos, yPos, 80, 20, "S");

        doc.setFontSize(10);
        doc.text(metric.label, xPos + 5, yPos + 8);
        doc.setFontSize(14);
        doc.text(metric.value as string, xPos + 5, yPos + 16);
      });

      yPos += 40;

      // Campaigns Table
      doc.setFontSize(16);
      doc.text("Campaign Performance", 20, yPos);
      yPos += 15;

      // Table headers
      doc.setFillColor(59, 130, 246);
      doc.rect(20, yPos, pageWidth - 40, 10, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("Campaign", 25, yPos + 7);
      doc.text("Clicks", 80, yPos + 7);
      doc.text("Conversions", 110, yPos + 7);
      doc.text("CTR", 150, yPos + 7);
      doc.text("Spent", 170, yPos + 7);

      yPos += 15;
      doc.setTextColor(0, 0, 0);

      // Table rows
      campaigns.forEach((campaign, index) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = 30;
        }

        // Alternating row colors
        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(20, yPos - 5, pageWidth - 40, 10, "F");
        }

        doc.text(campaign.name.substring(0, 20), 25, yPos + 2);
        doc.text(campaign.clicks.toLocaleString(), 80, yPos + 2);
        doc.text(campaign.conversions.toString(), 110, yPos + 2);
        doc.text(`${campaign.ctr}%`, 150, yPos + 2);
        doc.text(`$${campaign.spent.toLocaleString()}`, 170, yPos + 2);

        yPos += 10;
      });

      // Capture charts as images and add to PDF
      const chartElements = document.querySelectorAll("[data-chart]");
      for (let i = 0; i < chartElements.length; i++) {
        const canvas = await html2canvas(chartElements[i] as HTMLElement);
        const imgData = canvas.toDataURL("image/png");

        if (yPos > pageHeight - 80) {
          doc.addPage();
          yPos = 30;
        }

        doc.addImage(imgData, "PNG", 20, yPos, 170, 60);
        yPos += 70;
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("© 2024 Ad Analytics - Confidential", 20, pageHeight - 10);

      doc.save(`campaign_report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your campaigns."
      />
      <div className="flex justify-between pb-4 items-center">
        <DateRangePicker onDateChange={() => {}} />
        <Button
          onClick={exportDashboardPDF}
          disabled={isExporting}
          className="gap-2"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </>
          )}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard
              label={metric.label}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={
                index === 0
                  ? TrendingUp
                  : index === 1
                  ? BarChart3
                  : index === 2
                  ? Users
                  : Target
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div data-chart="performance-trend">
        <AreaChart data={trendData} title="Performance Trend" height={350} />
      </div>
      <br />
      <div data-chart="traffic-sources">
        <PieChart data={performanceData} title="Traffic Sources" height={350} />
      </div>
      <br />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TrendCard
          title="Conversion Rate"
          value="4.2%"
          data={trendData.slice(0, 5)}
          color="hsl(142.1 76.2% 36.3%)"
        />
        <TrendCard
          title="Average CPC"
          value="$1.23"
          data={trendData.slice(1, 6)}
          color="hsl(47.9 95.8% 53.1%)"
        />
        <TrendCard
          title="ROAS"
          value="3.8x"
          data={trendData.slice(2, 7)}
          color="hsl(0 84.2% 60.2%)"
        />
      </div>

      {/* Top Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Top Performing Campaigns</h3>
          <button
            className="text-primary hover:text-primary/80 text-sm font-medium"
            onClick={() => navigate("/campaigns")}
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {topCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {campaign.clicks.toLocaleString()} clicks •{" "}
                    {campaign.conversions} conversions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  {campaign.ctr}% CTR
                </p>
                <p className="text-sm text-muted-foreground">
                  ${campaign.spent.toLocaleString()} spent
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
