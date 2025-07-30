"use client"

import { motion } from "framer-motion"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { cn } from "../../lib/cn"

interface TrendCardProps {
  title: string
  value: string | number
  data: Array<{ name: string; value: number }>
  className?: string
  color?: string
}

export function TrendCard({ title, value, data, className, color = "hsl(var(--primary))" }: TrendCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
      </div>

      <div className="h-16 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#gradient-${title})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
