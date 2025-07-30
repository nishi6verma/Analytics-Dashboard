import { campaigns } from "./campaigns"

export interface DailyMetric {
  date: string
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cost: number
}

export interface CampaignAnalytics {
  campaignId: string
  metrics: {
    dailyMetrics: DailyMetric[]
    deviceBreakdown: { name: string; value: number }[]
    ageBreakdown: { name: string; value: number }[]
    genderBreakdown: { name: string; value: number }[]
    locationBreakdown: { name: string; value: number }[]
    hourlyPerformance: { hour: number; impressions: number; clicks: number }[]
  }
}


// Generate random daily metrics for the past 30 days
const generateDailyMetrics = (baseImpressions: number, baseCtr: number): DailyMetric[] => {
  const result: DailyMetric[] = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Add some randomness to the data
    const randomFactor = 0.7 + Math.random() * 0.6 // Between 0.7 and 1.3
    const impressions = Math.round(baseImpressions * randomFactor / 30)
    const ctr = baseCtr * (0.8 + Math.random() * 0.4) // Vary CTR by ±20%
    const clicks = Math.round(impressions * (ctr / 100))
    const conversions = Math.round(clicks * (0.05 + Math.random() * 0.1)) // 5-15% conversion rate
    const cost = Math.round((baseImpressions / 30) * randomFactor * 0.01 * 100) / 100
    
    result.push({
      date: date.toISOString().split('T')[0],
      impressions,
      clicks,
      conversions,
      ctr,
      cost
    })
  }
  
  return result
}

// Generate device breakdown data
const generateDeviceBreakdown = (): { name: string; value: number }[] => {
  return [
    { name: "Desktop", value: 35 + Math.floor(Math.random() * 20) },
    { name: "Mobile", value: 30 + Math.floor(Math.random() * 20) },
    { name: "Tablet", value: 5 + Math.floor(Math.random() * 10) },
  ]
}

// Generate age breakdown data
const generateAgeBreakdown = (): { name: string; value: number }[] => {
  return [
    { name: "18-24", value: 10 + Math.floor(Math.random() * 15) },
    { name: "25-34", value: 25 + Math.floor(Math.random() * 15) },
    { name: "35-44", value: 20 + Math.floor(Math.random() * 15) },
    { name: "45-54", value: 15 + Math.floor(Math.random() * 10) },
    { name: "55+", value: 5 + Math.floor(Math.random() * 10) },
  ]
}

// Generate gender breakdown data
const generateGenderBreakdown = (): { name: string; value: number }[] => {
  const male = 40 + Math.floor(Math.random() * 20)
  return [
    { name: "Male", value: male },
    { name: "Female", value: 100 - male },
  ]
}

// Generate location breakdown data
const generateLocationBreakdown = (): { name: string; value: number }[] => {
  return [
    { name: "United States", value: 40 + Math.floor(Math.random() * 20) },
    { name: "United Kingdom", value: 15 + Math.floor(Math.random() * 10) },
    { name: "Canada", value: 10 + Math.floor(Math.random() * 10) },
    { name: "Australia", value: 8 + Math.floor(Math.random() * 7) },
    { name: "Germany", value: 5 + Math.floor(Math.random() * 5) },
    { name: "Other", value: 5 + Math.floor(Math.random() * 10) },
  ]
}

// Generate hourly performance data
const generateHourlyPerformance = (baseImpressions: number): { hour: number; impressions: number; clicks: number }[] => {
  const result: { hour: number; impressions: number; clicks: number }[] = []
  
  for (let hour = 0; hour < 24; hour++) {
    // Create a curve that peaks during business hours
    let multiplier = 0.2
    if (hour >= 8 && hour <= 22) {
      multiplier = 0.5 + 0.5 * Math.sin(((hour - 8) / 14) * Math.PI)
    }
    
    const impressions = Math.round((baseImpressions / 30 / 24) * multiplier * (1 + Math.random() * 0.5))
    const clicks = Math.round(impressions * (0.02 + Math.random() * 0.04))
    
    result.push({
      hour,
      impressions,
      clicks
    })
  }
  
  return result
}

// Generate analytics data for each campaign
export const campaignAnalytics: CampaignAnalytics[] = campaigns.map(campaign => ({
  campaignId: campaign.id,
  metrics: {
    dailyMetrics: generateDailyMetrics(campaign.impressions, campaign.ctr),
    deviceBreakdown: generateDeviceBreakdown(),
    ageBreakdown: generateAgeBreakdown(),
    genderBreakdown: generateGenderBreakdown(),
    locationBreakdown: generateLocationBreakdown(),
    hourlyPerformance: generateHourlyPerformance(campaign.impressions)
  }
}))

// Helper function to get analytics for a specific campaign
export function getCampaignAnalytics(campaignId: string): CampaignAnalytics | undefined {
  return campaignAnalytics.find(analytics => analytics.campaignId === campaignId)
}