export interface AudienceSegment {
  name: string
  value: number
  percentage: number
  color: string
}

export interface DemographicData {
  ageGroup: string
  male: number
  female: number
  other: number
}

export const audienceByDevice: AudienceSegment[] = [
  { name: "Desktop", value: 45230, percentage: 65.2, color: "hsl(221.2 83.2% 53.3%)" },
  { name: "Mobile", value: 19456, percentage: 28.1, color: "hsl(142.1 76.2% 36.3%)" },
  { name: "Tablet", value: 4634, percentage: 6.7, color: "hsl(47.9 95.8% 53.1%)" },
]

export const audienceByLocation: AudienceSegment[] = [
  { name: "United States", value: 28450, percentage: 41.0, color: "hsl(221.2 83.2% 53.3%)" },
  { name: "Canada", value: 12340, percentage: 17.8, color: "hsl(142.1 76.2% 36.3%)" },
  { name: "United Kingdom", value: 9876, percentage: 14.2, color: "hsl(47.9 95.8% 53.1%)" },
  { name: "Germany", value: 7654, percentage: 11.0, color: "hsl(0 84.2% 60.2%)" },
  { name: "Other", value: 11000, percentage: 16.0, color: "hsl(215.4 16.3% 46.9%)" },
]

export const demographicData: DemographicData[] = [
  { ageGroup: "18-24", male: 1200, female: 1800, other: 50 },
  { ageGroup: "25-34", male: 2400, female: 2200, other: 80 },
  { ageGroup: "35-44", male: 1800, female: 2000, other: 60 },
  { ageGroup: "45-54", male: 1500, female: 1600, other: 40 },
  { ageGroup: "55+", male: 1000, female: 1200, other: 30 },
]
