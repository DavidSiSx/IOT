import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import Card from "./card"
import styles from "./temperature-card.module.css"

interface TemperatureCardProps {
  title: string
  value: number
  unit: string
  icon?: ReactNode
  trend?: "up" | "down" | "stable"
  min?: number
  max?: number
}

export default function TemperatureCard({
  title,
  value,
  unit,
  icon,
  trend = "stable",
  min,
  max,
}: TemperatureCardProps) {
  const trendIcon =
    trend === "up" ? (
      <ArrowUp className={styles.trendUp} />
    ) : trend === "down" ? (
      <ArrowDown className={styles.trendDown} />
    ) : null

  // Calculate temperature color based on value
  const getTemperatureColor = () => {
    if (value < 10) return "#4A5E69" // Cold - slate gray
    if (value < 20) return "#e9e9e9" // Cool - white
    if (value < 30) return "#feb10b" // Warm - yellow
    return "#D22512" // Hot - red
  }

  return (
    <Card title={title} className={styles.temperatureCard}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.valueContainer}>
        <span className={styles.value} style={{ color: getTemperatureColor() }}>
          {value}
          <span className={styles.unit}>{unit}</span>
        </span>
        {trendIcon && <span className={styles.trend}>{trendIcon}</span>}
      </div>
      {min !== undefined && max !== undefined && (
        <div className={styles.rangeContainer}>
          <div className={styles.range}>
            <div
              className={styles.rangeFill}
              style={{
                width: `${((value - min) / (max - min)) * 100}%`,
                backgroundColor: getTemperatureColor(),
              }}
            />
          </div>
          <div className={styles.rangeLabels}>
            <span>
              {min}
              {unit}
            </span>
            <span>
              {max}
              {unit}
            </span>
          </div>
        </div>
      )}

      <div className={styles.thermometer}>
        <div
          className={styles.thermometerFill}
          style={{
            height: `${((value - min) / (max - min)) * 100}%`,
            backgroundColor: getTemperatureColor(),
          }}
        />
        <div className={styles.thermometerBulb} style={{ backgroundColor: getTemperatureColor() }} />
      </div>
    </Card>
  )
}

