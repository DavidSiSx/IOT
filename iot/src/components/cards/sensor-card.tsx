import type React from "react"
import type { ReactNode } from "react"
import styles from "./sensor-card.module.css"

interface SensorCardProps {
  title: string
  value: number
  unit: string
  icon?: ReactNode
  minValue: number
  maxValue: number
}

const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, icon, minValue, maxValue }) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100))

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.valueContainer}>
        <div className={styles.value}>{value}</div>
        <div className={styles.unit}>{unit}</div>
      </div>

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${progressPercentage}%`,
          }}
        ></div>
      </div>

      <div className={styles.rangeLabels}>
        <span>
          {minValue} {unit}
        </span>
        <span>
          {maxValue} {unit}
        </span>
      </div>
    </div>
  )
}

export default SensorCard

