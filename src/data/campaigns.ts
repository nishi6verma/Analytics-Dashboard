export interface Campaign {
  id: string
  name: string
  status: "active" | "paused" | "completed"
  budget: number
  spent: number
  ctr: number
  impressions: number
  clicks: number
  conversions: number
  startDate: string
  endDate?: string
}

export const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    status: "active",
    budget: 5000,
    spent: 3240,
    ctr: 3.24,
    impressions: 125000,
    clicks: 4050,
    conversions: 324,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: "2",
    name: "Brand Awareness",
    status: "active",
    budget: 8000,
    spent: 6100,
    ctr: 2.87,
    impressions: 280000,
    clicks: 8036,
    conversions: 567,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
  },
  {
    id: "3",
    name: "Product Launch",
    status: "paused",
    budget: 3000,
    spent: 1850,
    ctr: 4.12,
    impressions: 95000,
    clicks: 3914,
    conversions: 289,
    startDate: "2024-05-15",
  },
  {
    id: "4",
    name: "Retargeting Campaign",
    status: "active",
    budget: 2500,
    spent: 1200,
    ctr: 5.67,
    impressions: 45000,
    clicks: 2551,
    conversions: 178,
    startDate: "2024-07-01",
    endDate: "2024-07-31",
  },
  {
    id: "5",
    name: "Holiday Promotion",
    status: "completed",
    budget: 10000,
    spent: 9850,
    ctr: 3.89,
    impressions: 450000,
    clicks: 17505,
    conversions: 1245,
    startDate: "2023-11-01",
    endDate: "2023-12-31",
  },
  {
    id: "6",
    name: "AI-Powered Chatbot",
    status: "active",
    budget: 7000,
    spent: 5000,
    ctr: 4.21,
    impressions: 300000,
    clicks: 12000,
    conversions: 890,
    startDate: "2024-08-01",
    endDate: "2024-09-30",
  }
]
