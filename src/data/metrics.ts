export interface Metric {
  label: string
  value: string | number
  change: number
  trend: "up" | "down" | "neutral"
  icon?: string
}

export interface ChartData {
  name: string
  value: number
  date?: string
}

export const dashboardMetrics: Metric[] = [
  {
    label: "Click-Through Rate",
    value: "3.24%",
    change: 12.5,
    trend: "up",
  },
  {
    label: "Cost Per Click",
    value: "$1.23",
    change: -8.2,
    trend: "down",
  },
  {
    label: "Impressions",
    value: "2.4M",
    change: 15.3,
    trend: "up",
  },
  {
    label: "Conversions",
    value: "1,247",
    change: 23.1,
    trend: "up",
  },
]

export const trendData: ChartData[] = [
  { name: "Jan", value: 4000, date: "2024-01" },
  { name: "Feb", value: 3000, date: "2024-02" },
  { name: "Mar", value: 5000, date: "2024-03" },
  { name: "Apr", value: 4500, date: "2024-04" },
  { name: "May", value: 6000, date: "2024-05" },
  { name: "Jun", value: 5500, date: "2024-06" },
  { name: "Jul", value: 7000, date: "2024-07" },
]

export const performanceData: ChartData[] = [
  { name: "Desktop", value: 65 },
  { name: "Mobile", value: 28 },
  { name: "Tablet", value: 7 },
]
