import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { reports } from "../data/reports";
import { formatCurrency, formatNumber } from "../lib/utils";
import {
  FileText,
  Download,
  Calendar,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { cn } from "../lib/cn";
import { jsPDF } from "jspdf";

export function Reports() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "generating":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "audience":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "conversion":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "custom":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

 const handleReportDownloadPDF = (report: (typeof reports)[0]) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // Title
  pdf.setFontSize(22);
  pdf.setTextColor(30, 64, 175); // blue-ish
  pdf.text(report.name, margin, y);
  y += 10;

  // Subtitle / Description
  pdf.setFontSize(11);
  pdf.setTextColor(55);
  pdf.text(report.description, margin, y, { maxWidth: pageWidth - margin * 2 });
  y += 15;

  // Labels (Type and Status) as colored boxes with text
  const labelHeight = 7;
  const labelPaddingX = 4;
  const labelSpacing = 8;

  // Draw type label background
  pdf.setFillColor(219, 234, 254); // light blue
  const typeText = report.type.charAt(0).toUpperCase() + report.type.slice(1);
  const typeTextWidth = pdf.getTextWidth(typeText) + 2 * labelPaddingX;
  pdf.rect(margin, y, typeTextWidth, labelHeight, "F");
  pdf.setTextColor(30, 64, 175); // blue text
  pdf.setFontSize(10);
  pdf.text(typeText, margin + labelPaddingX, y + 5.2);

  // Draw status label background
  pdf.setFillColor(187, 247, 208); // light green
  const statusText = report.status.charAt(0).toUpperCase() + report.status.slice(1);
  const statusTextWidth = pdf.getTextWidth(statusText) + 2 * labelPaddingX;
  pdf.rect(margin + typeTextWidth + labelSpacing, y, statusTextWidth, labelHeight, "F");
  pdf.setTextColor(22, 101, 52); // green text
  pdf.text(statusText, margin + typeTextWidth + labelSpacing + labelPaddingX, y + 5.2);

  y += labelHeight + 15;

  // Section: Metrics title
  pdf.setFontSize(14);
  pdf.setTextColor(0);
  pdf.text("Metrics", margin, y);
  y += 10;

  // Draw metrics in grid (2 columns)
  const colWidth = (pageWidth - margin * 2 - 10) / 2; // 10 = gap between columns
  const rowHeight = 22;
  const metricLabels = ["Impressions", "Clicks", "Conversions", "Revenue"];
  const metricValues = [
    report.metrics.impressions.toLocaleString(),
    report.metrics.clicks.toLocaleString(),
    report.metrics.conversions.toLocaleString(),
    `$${report.metrics.revenue.toLocaleString()}`,
  ];

  pdf.setFontSize(12);
  pdf.setTextColor(55);

  for (let i = 0; i < metricLabels.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * (colWidth + 10);
    const yPos = y + row * (rowHeight + 8);

    // Metric box bg
    pdf.setFillColor(249, 250, 251);
    pdf.roundedRect(x, yPos, colWidth, rowHeight, 3, 3, "F");

    // Metric label
    pdf.setTextColor(111);
    pdf.setFontSize(10);
    pdf.text(metricLabels[i], x + 6, yPos + 8);

    // Metric value
    pdf.setTextColor(0);
    pdf.setFontSize(15);
    pdf.text(metricValues[i], x + 6, yPos + 18);
  }

  y += 2 * (rowHeight + 8) + 15;

  // Footer / Generated date
  pdf.setFontSize(9);
  pdf.setTextColor(120);
  const footerText = `Report generated on ${new Date().toLocaleDateString()}`;
  pdf.text(footerText, margin, pdf.internal.pageSize.getHeight() - 15);

  // Save PDF
  pdf.save(`${report.name.toLowerCase().replace(/ /g, "_")}.pdf`);
};

  return (
    <Container>
      <PageHeader
        title="Reports"
        subtitle="Generate and manage your analytics reports"
      />
      <div className="flex justify-between pb-4 items-center">
        <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
          <Calendar className="w-4 h-4" />
          <span>Date Range</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{report.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        getTypeColor(report.type)
                      )}
                    >
                      <span className="capitalize">{report.type}</span>
                    </div>
                    <div
                      className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        getStatusColor(report.status)
                      )}
                    >
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              {report.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Impressions</p>
                <p className="font-semibold">
                  {formatNumber(report.metrics.impressions)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Clicks</p>
                <p className="font-semibold">
                  {formatNumber(report.metrics.clicks)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conversions</p>
                <p className="font-semibold">
                  {formatNumber(report.metrics.conversions)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="font-semibold">
                  {formatCurrency(report.metrics.revenue)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Updated {new Date(report.lastUpdated).toLocaleDateString()}
              </p>
              <button
                className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                disabled={report.status !== "ready"}
                onClick={() => handleReportDownloadPDF(report)}
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
