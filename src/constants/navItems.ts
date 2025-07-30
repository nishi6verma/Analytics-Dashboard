import { BarChart3, FileText, Target, Users, Settings, Home } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: Target,
    badge: "12",
  },
  {
    title: "Audience",
    href: "/audience",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  }
]
