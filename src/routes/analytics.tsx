"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { AreaChart } from "../components/charts/AreaChart";
import { PieChart } from "../components/charts/PieChart";
import { campaigns } from "../data/campaigns";
import {
  type CampaignAnalytics,
  getCampaignAnalytics,
} from "../data/analytics";
import { formatCurrency, formatPercentage, formatNumber } from "../lib/utils";
import { Download } from "lucide-react";
import { DateRangePicker } from "../components/filters/DateRangePicker";
import { Button } from "@ui/button";

export function Analytics() {
  const [searchParams] = useSearchParams();

  const campaignId = searchParams.get("campaignId");

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    campaignId ?? campaigns[0]?.id ?? ""
  );
  const [analyticsData, setAnalyticsData] = useState<CampaignAnalytics | null>(
    null
  );
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Fetch analytics data on campaign change
  useEffect(() => {
    if (selectedCampaignId) {
      const data = getCampaignAnalytics(selectedCampaignId);
      setAnalyticsData(data ?? null);
    }
  }, [selectedCampaignId]);

  // Helper: Prepare chart data (daily clicks with day labels)
  const preparePerformanceData = () => {
    if (!analyticsData) return [];
    return analyticsData.metrics.dailyMetrics.map((metric) => ({
      name: metric.date.split("-")[2], // Day part of YYYY-MM-DD
      value: metric.clicks,
      date: metric.date,
    }));
  };

  // Helper: Aggregate summary metrics
  const calculateSummaryMetrics = () => {
    if (!analyticsData) {
      return { impressions: 0, clicks: 0, conversions: 0, ctr: 0, cost: 0 };
    }

    const metrics = analyticsData.metrics.dailyMetrics;
    const impressions = metrics.reduce((acc, day) => acc + day.impressions, 0);
    const clicks = metrics.reduce((acc, day) => acc + day.clicks, 0);
    const conversions = metrics.reduce((acc, day) => acc + day.conversions, 0);
    const cost = metrics.reduce((acc, day) => acc + day.cost, 0);
    const ctr = impressions ? (clicks / impressions) * 100 : 0;

    return { impressions, clicks, conversions, ctr, cost };
  };

  const summaryMetrics = calculateSummaryMetrics();

  const exportAnalyticsPDF = async () => {
    setIsExporting(true);
    try {
      const [jsPDFModule, html2canvasModule] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);
      const jsPDF = jsPDFModule.default ?? jsPDFModule.jsPDF;
      const html2canvas = html2canvasModule.default ?? html2canvasModule;

      const doc = new jsPDF("p", "mm", "a4");
      const pageHeight = doc.internal.pageSize.height;
      let y = 20;

      // Section Helper
      const drawSectionHeader = (title: string) => {
        doc.setDrawColor(52, 152, 219); // Blue bar
        doc.setFillColor(52, 152, 219);
        doc.rect(15, y - 6, 180, 8, "F"); // Colored bar
        doc.setTextColor(255);
        doc.setFontSize(12);
        doc.text(title, 20, y);
        y += 10;
        doc.setTextColor(0); // reset
      };

      // Header
      doc.setFontSize(18);
      doc.text("Campaign Analytics Report", 20, y);
      y += 12;

      doc.setFontSize(10);
      const campaignName =
        campaigns.find((c) => c.id === selectedCampaignId)?.name ?? "Campaign";
      doc.text(`Campaign: ${campaignName}`, 20, y);
      y += 6;
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, y);
      y += 10;

      // Overview Metrics
      drawSectionHeader("Overview Metrics");
      doc.setFontSize(10);
      doc.text(
        `Impressions: ${formatNumber(summaryMetrics.impressions)}`,
        20,
        y
      );
      doc.text(`Clicks: ${formatNumber(summaryMetrics.clicks)}`, 70, y);
      doc.text(`CTR: ${formatPercentage(summaryMetrics.ctr)}`, 120, y);
      y += 6;
      doc.text(
        `Conversions: ${formatNumber(summaryMetrics.conversions)}`,
        20,
        y
      );
      doc.text(`Cost: ${formatCurrency(summaryMetrics.cost)}`, 70, y);
      y += 12;

      // Charts
      const charts = [
        {
          selector: "#analytics-performance-chart",
          title: "Daily Performance",
        },
        { selector: "#analytics-device-chart", title: "Device Breakdown" },
        { selector: "#analytics-age-chart", title: "Age Demographics" },
        { selector: "#analytics-gender-chart", title: "Gender Distribution" },
        {
          selector: "#analytics-location-chart",
          title: "Geographic Distribution",
        },
      ];

      for (const chart of charts) {
        const element = document.querySelector(chart.selector) as HTMLElement;
        if (element) {
          const canvas = await html2canvas(element, {
            backgroundColor: "#fff",
            scale: 1.2,
            useCORS: true,
          });
          const imgData = canvas.toDataURL("image/jpeg", 0.6);

          if (y + 100 > pageHeight) {
            doc.addPage();
            y = 20;
          }

          drawSectionHeader(chart.title);
          const imgWidth = 180;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          doc.addImage(imgData, "JPEG", 15, y, imgWidth, imgHeight);
          y += imgHeight + 10;
        }
      }

      // Hourly Performance Table
      const hourlyData = analyticsData?.metrics.hourlyPerformance ?? [];
      if (hourlyData.length > 0) {
        if (y + 55 > pageHeight) {
          doc.addPage();
          y = 20;
        }

        drawSectionHeader("Hourly Performance");

        doc.setFontSize(9);
        doc.setFont(undefined, "bold");
        doc.text("Hour", 20, y);
        doc.text("Impressions", 55, y);
        doc.text("Clicks", 95, y);
        doc.text("CTR", 135, y);
        y += 5;
        doc.setFont(undefined, "normal");

        for (const hourData of hourlyData) {
          if (y + 6 > pageHeight) {
            doc.addPage();
            y = 20;
          }

          const ctr =
            hourData.impressions > 0
              ? (hourData.clicks / hourData.impressions) * 100
              : 0;

          doc.text(`${hourData.hour}:00`, 20, y);
          doc.text(formatNumber(hourData.impressions), 55, y);
          doc.text(formatNumber(hourData.clicks), 95, y);
          doc.text(formatPercentage(ctr), 135, y);
          y += 6;
        }
      }

      // Save file
      doc.save(
        `analytics_${campaignName.replace(/\s+/g, "_").toLowerCase()}.pdf`
      );
    } catch (e) {
      console.error("Failed to export PDF:", e);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Container className="w-full">
      <PageHeader
        title="Campaign Analytics"
        subtitle="Detailed performance metrics for your advertising campaigns"
      />
      <div className="flex justify-between pb-4 items-center">
        <DateRangePicker onDateChange={() => {}} />
        <Button
          onClick={exportAnalyticsPDF}
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
      {/* Campaign Selector */}
      <div className="mb-8 bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Select Campaign</h3>
        <select
          value={selectedCampaignId}
          onChange={(e) => setSelectedCampaignId(e.target.value)}
          className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
      </div>

      {analyticsData ? (
        <>
          {/* Campaign Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Campaign Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard
                label="Impressions"
                value={formatNumber(summaryMetrics.impressions)}
              />
              <MetricCard
                label="Clicks"
                value={formatNumber(summaryMetrics.clicks)}
              />
              <MetricCard
                label="CTR"
                value={formatPercentage(summaryMetrics.ctr)}
                valueClass="text-green-600"
              />
              <MetricCard
                label="Conversions"
                value={formatNumber(summaryMetrics.conversions)}
              />
              <MetricCard
                label="Cost"
                value={formatCurrency(summaryMetrics.cost)}
              />
            </div>
          </motion.div>

          {/* Charts */}
          <div id="analytics-performance-chart" className="mb-8">
            <AreaChart
              data={preparePerformanceData()}
              title="Daily Performance"
              height={350}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div id="analytics-device-chart">
              <PieChart
                data={analyticsData.metrics.deviceBreakdown}
                title="Device Breakdown"
                height={300}
              />
            </div>
            <div id="analytics-age-chart">
              <PieChart
                data={analyticsData.metrics.ageBreakdown}
                title="Age Demographics"
                height={300}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div id="analytics-gender-chart">
              <PieChart
                data={analyticsData.metrics.genderBreakdown}
                title="Gender Distribution"
                height={300}
              />
            </div>
            <div id="analytics-location-chart">
              <PieChart
                data={analyticsData.metrics.locationBreakdown}
                title="Geographic Distribution"
                height={300}
              />
            </div>
          </div>

          {/* Hourly Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-8 bg-card rounded-xl border border-border p-6 shadow-sm overflow-x-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Hourly Performance</h3>
            <table className="w-full table-auto border-collapse">
              <thead className="bg-accent/50">
                <tr>
                  <th className="text-left p-3 font-semibold border-b border-border">
                    Hour
                  </th>
                  <th className="text-left p-3 font-semibold border-b border-border">
                    Impressions
                  </th>
                  <th className="text-left p-3 font-semibold border-b border-border">
                    Clicks
                  </th>
                  <th className="text-left p-3 font-semibold border-b border-border">
                    CTR
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.metrics.hourlyPerformance.map((hour) => (
                  <tr
                    key={hour.hour}
                    className="border-b border-border hover:bg-accent/30 transition-colors"
                  >
                    <td className="p-3">{hour.hour}:00</td>
                    <td className="p-3">{hour.impressions.toLocaleString()}</td>
                    <td className="p-3">{hour.clicks.toLocaleString()}</td>
                    <td className="p-3 text-green-600">
                      {formatPercentage(
                        hour.impressions > 0
                          ? (hour.clicks / hour.impressions) * 100
                          : 0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground">
            Select a campaign to view analytics
          </p>
        </div>
      )}
    </Container>
  );
}

// Reusable Summary Metric Card
function MetricCard({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="bg-accent/30 p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueClass}`}>{value}</p>
    </div>
  );
}
