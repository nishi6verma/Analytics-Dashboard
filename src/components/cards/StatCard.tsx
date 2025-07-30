"use client"

import type React from "react"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "../../lib/cn"

interface StatCardProps {
  label: string
  value: string | number
  change: number
  trend: "up" | "down" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function StatCard({ label, value, change, trend, icon: Icon, className }: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />
      case "down":
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600 dark:text-green-400"
      case "down":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-foreground">{value}</p>

        <div className={cn("flex items-center space-x-1 text-sm", getTrendColor())}>
          {getTrendIcon()}
          <span className="font-medium">{Math.abs(change)}%</span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      </div>
    </motion.div>
  )
}
