export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getRandomColor(): string {
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(221.2 83.2% 53.3%)",
    "hsl(142.1 76.2% 36.3%)",
    "hsl(47.9 95.8% 53.1%)",
    "hsl(0 84.2% 60.2%)",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(" ");
}
