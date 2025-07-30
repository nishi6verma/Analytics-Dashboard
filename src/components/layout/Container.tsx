"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("p-6 max-w-7xl mx-auto", className)}
    >
      {children}
    </motion.div>
  )
}
