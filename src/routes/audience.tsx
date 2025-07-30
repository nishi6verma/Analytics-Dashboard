import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/layout/Container";
import { PageHeader } from "../components/layout/PageHeader";
import { PieChart } from "../components/charts/PieChart";
import { BarChart } from "../components/charts/BarChart";
import { Button } from "@ui/button";
import {
  audienceByDevice,
  audienceByLocation,
  demographicData,
} from "../data/audience";
import { formatNumber, formatPercentage } from "../lib/utils";
import {
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
} from "lucide-react";

export function Audience() {
  const [isExporting, setIsExporting] = useState(false);

  const deviceData = audienceByDevice.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  const locationData = audienceByLocation.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  const ageData = demographicData.map((item) => ({
    name: item.ageGroup,
    value: item.male + item.female + item.other,
  }));

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

const exportAudiencePDF = async () => {
  setIsExporting(true);
  try {
    const [{ jsPDF }] = await Promise.all([import("jspdf")]);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // === HEADER ===
    let y = 16;
    doc.setFillColor(59, 130, 246); // solid blue header
    doc.rect(0, 0, pageWidth, 28, "F");

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Audience Insights Report", 18, 18);

    doc.setFontSize(10);
    doc.setTextColor(220, 220, 255);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 18, 25);

    // === OVERVIEW CARDS ===
    y = 38;
    const overview = [
      {
        label: "Total Users",
        value: formatNumber(audienceByDevice.reduce((sum, d) => sum + (d?.value || 0), 0)),
        bg: [219, 234, 254],
        color: [29, 78, 216],
      },
      {
        label: "Countries",
        value: formatNumber(audienceByLocation.length),
        bg: [209, 250, 229],
        color: [21, 128, 61],
      },
      {
        label: "Mobile Users",
        value: (() => {
          const mob = audienceByDevice.find(d => d?.name?.toLowerCase() === "mobile");
          return mob ? formatPercentage(mob.percentage) : "--";
        })(),
        bg: [237, 233, 254],
        color: [126, 34, 206],
      },
    ];

    const cardW = 60, cardH = 22, spacing = 14;
    let x = 18;
    doc.setFontSize(10);
    overview.forEach(card => {
      if (Array.isArray(card.bg) && card.bg.length === 3) {
        doc.setFillColor(...card.bg);
      } else {
        doc.setFillColor(240); // fallback
      }

      doc.roundedRect(x, y, cardW, cardH, 5, 5, "F");
      doc.setDrawColor(246, 240, 255);
      doc.roundedRect(x, y, cardW, cardH, 5, 5, "S");

      doc.setTextColor(100);
      doc.text(String(card.label), x + 6, y + 8);

      if (Array.isArray(card.color) && card.color.length === 3) {
        doc.setTextColor(...card.color);
      } else {
        doc.setTextColor(0);
      }

      doc.setFontSize(13);
      doc.text(String(card.value), x + 6, y + 17);
      doc.setFontSize(10);

      x += cardW + spacing;
    });

    // === DEVICE BREAKDOWN ===
    y += cardH + 18;
    doc.setTextColor(35);
    doc.setFontSize(13);
    doc.text("Device Breakdown", 18, y);
    y += 8;

    doc.setFontSize(9);
    doc.text("Device", 18, y);
    doc.text("Users", 53, y);
    doc.text("Share", 83, y);
    y += 5;

    audienceByDevice.forEach(dev => {
      const hex = dev?.color || "#bbbbbb";
      const rgb = /^#[0-9A-Fa-f]{6}$/.test(hex)
        ? hex
            .replace("#", "")
            .match(/.{1,2}/g)
            ?.map(v => parseInt(v, 16)) ?? [187, 187, 187]
        : [187, 187, 187];

      doc.setDrawColor(200);
      doc.setFillColor(...rgb);
      doc.rect(18, y - 3.5, 4, 4, "F");

      doc.setTextColor(35);
      doc.text(String(dev.name), 25, y);
      doc.text(String(formatNumber(dev.value)), 53, y);
      doc.text(String(formatPercentage(dev.percentage)), 83, y);
      y += 7;
    });

    // === TOP LOCATIONS ===
    y += 6;
    doc.setFontSize(13);
    doc.text("Top Locations", 18, y);
    y += 8;
    doc.setFontSize(9);
    doc.text("Location", 18, y);
    doc.text("Users", 53, y);
    y += 5;

    audienceByLocation.slice(0, 7).forEach(loc => {
      doc.text(String(loc.name), 18, y);
      doc.text(String(formatNumber(loc.value)), 53, y);
      y += 6;
    });

    // === DEMOGRAPHICS TABLE ===
    y += 8;
    doc.setFontSize(13);
    doc.text("Demographics by Age & Gender", 18, y);
    y += 8;

    const columnX = [22, 50, 72, 94, 115];
    const headers = ["Age Group", "Male", "Female", "Other", "Total"];

    doc.setFontSize(8);
    doc.setFillColor(240);
    doc.rect(18, y - 4, 100, 6, "F");
    headers.forEach((col, i) => doc.text(col, columnX[i], y));

    y += 5;
    doc.setFontSize(9);

    demographicData.forEach(demo => {
      const row = [
        demo.ageGroup,
        formatNumber(demo.male),
        formatNumber(demo.female),
        formatNumber(demo.other),
        formatNumber(demo.male + demo.female + demo.other),
      ];

      row.forEach((val, i) => {
        doc.text(String(val), columnX[i], y);
      });

      y += 6;
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    // === FOOTER ===
    const footerY = doc.internal.pageSize.getHeight() - 6;
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("© 2025 AdMyBrand Analytics", 18, footerY);

    doc.save("audience_report.pdf");
  } catch (e) {
    alert("Export failed. Please try again.");
    console.error(e);
  } finally {
    setIsExporting(false);
  }
};

  return (
    <Container>
      <PageHeader
        title="Audience"
        subtitle="Understand your audience demographics and behavior"
      />
      <div className="flex justify-end pb-4 items-center">
        <Button
          onClick={exportAudiencePDF}
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">69,320</p>
            </div>
          </div>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Countries</p>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
          <p className="text-sm text-green-600">+3 new countries</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mobile Users</p>
              <p className="text-2xl font-bold">28.1%</p>
            </div>
          </div>
          <p className="text-sm text-red-600">-2.3% from last month</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PieChart data={deviceData} title="Audience by Device" height={350} />
        <PieChart
          data={locationData}
          title="Audience by Location"
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChart data={ageData} title="Age Distribution" height={350} />

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-6">Device Breakdown</h3>
          <div className="space-y-4">
            {audienceByDevice.map((device, index) => (
              <motion.div
                key={device.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getDeviceIcon(device.name)}
                  </div>
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(device.value)} users
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatPercentage(device.percentage)}
                  </p>
                  <div className="w-20 bg-accent rounded-full h-2 mt-1">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${device.percentage}%`,
                        backgroundColor: device.color,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Demographics Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">
            Demographics by Age & Gender
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/50">
              <tr>
                <th className="text-left p-4 font-semibold">Age Group</th>
                <th className="text-left p-4 font-semibold">Male</th>
                <th className="text-left p-4 font-semibold">Female</th>
                <th className="text-left p-4 font-semibold">Other</th>
                <th className="text-left p-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {demographicData.map((demo, index) => (
                <motion.tr
                  key={demo.ageGroup}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="border-b border-border hover:bg-accent/30 transition-colors"
                >
                  <td className="p-4 font-medium">{demo.ageGroup}</td>
                  <td className="p-4">{formatNumber(demo.male)}</td>
                  <td className="p-4">{formatNumber(demo.female)}</td>
                  <td className="p-4">{formatNumber(demo.other)}</td>
                  <td className="p-4 font-semibold">
                    {formatNumber(demo.male + demo.female + demo.other)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </Container>
  );
}
