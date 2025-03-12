import type { ReactNode } from "react"
import Card from "./card"
import styles from "./energy-card.module.css"

interface EnergyCardProps {
  title: string
  value: number
  unit: string
  icon?: ReactNode
}

export default function EnergyCard({ title, value, unit, icon }: EnergyCardProps) {
  // Sample data for the energy consumption chart
  const hourlyData = [1.2, 1.8, 2.1, 1.6, 1.9, 2.4, 2.2, 1.8, 1.5, 1.7, 2.0, 2.4]

  // Find max value for scaling
  const maxValue = Math.max(...hourlyData)

  return (
    <Card title={title} size="wide">
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{value}</span>
          <span className={styles.unit}>{unit}</span>
          <span className={styles.label}>Consumo actual</span>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            {hourlyData.map((dataPoint, index) => (
              <div
                key={index}
                className={styles.bar}
                style={{
                  height: `${(dataPoint / maxValue) * 100}%`,
                  backgroundColor: dataPoint === value ? "#D22512" : "#feb10b",
                }}
              >
                <span className={styles.tooltip}>
                  {dataPoint} {unit}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.chartLabels}>
            {hourlyData.map((_, index) => (
              <div key={index} className={styles.chartLabel}>
                {index + 1}h
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

