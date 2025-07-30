export interface Report {
  id: string
  name: string
  description: string
  lastUpdated: string
  type: "performance" | "audience" | "conversion" | "custom"
  status: "ready" | "generating" | "error"
  metrics: {
    impressions: number
    clicks: number
    conversions: number
    revenue: number
  }
}

export const reports: Report[] = [
  {
    id: "1",
    name: "Monthly Performance Report",
    description: "Comprehensive overview of campaign performance for the current month",
    lastUpdated: "2024-07-15T10:30:00Z",
    type: "performance",
    status: "ready",
    metrics: {
      impressions: 1250000,
      clicks: 45000,
      conversions: 2340,
      revenue: 125000,
    },
  },
  {
    id: "2",
    name: "Audience Insights",
    description: "Detailed breakdown of audience demographics and behavior",
    lastUpdated: "2024-07-14T15:45:00Z",
    type: "audience",
    status: "ready",
    metrics: {
      impressions: 890000,
      clicks: 32000,
      conversions: 1890,
      revenue: 89000,
    },
  },
  {
    id: "3",
    name: "Conversion Funnel Analysis",
    description: "Step-by-step analysis of user conversion journey",
    lastUpdated: "2024-07-13T09:15:00Z",
    type: "conversion",
    status: "generating",
    metrics: {
      impressions: 567000,
      clicks: 23000,
      conversions: 1456,
      revenue: 67000,
    },
  },
  {
    id: "4",
    name: "Custom ROI Report",
    description: "Custom report focusing on return on investment metrics",
    lastUpdated: "2024-07-12T14:20:00Z",
    type: "custom",
    status: "ready",
    metrics: {
      impressions: 345000,
      clicks: 15000,
      conversions: 890,
      revenue: 45000,
    },
  },
]
