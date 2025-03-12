import type React from "react"
import type { ReactNode } from "react"
import Card from "./card"
import styles from "./air-quality-card.module.css"

interface AirQualityCardProps {
  title: string
  value: number
  icon?: ReactNode
}

export default function AirQualityCard({ title, value, icon }: AirQualityCardProps) {
  // Determine quality level based on value
  const getQualityLevel = () => {
    if (value >= 80) return { level: "Excelente", color: "#feb10b" }
    if (value >= 60) return { level: "Bueno", color: "#4A5E69" }
    if (value >= 40) return { level: "Moderado", color: "#e9e9e9" }
    if (value >= 20) return { level: "Pobre", color: "#D22512" }
    return { level: "Peligroso", color: "#D22512" }
  }

  const qualityInfo = getQualityLevel()

  return (
    <Card title={title}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.container}>
        <div className={styles.gauge} style={{ "--quality-color": qualityInfo.color } as React.CSSProperties}>
          <svg viewBox="0 0 120 120" className={styles.gaugeSvg}>
            <circle
              className={styles.gaugeBackground}
              cx="60"
              cy="60"
              r="54"
              strokeWidth="12"
              strokeDasharray="339.3"
              strokeDashoffset="0"
            />
            <circle
              className={styles.gaugeFill}
              cx="60"
              cy="60"
              r="54"
              strokeWidth="12"
              strokeDasharray="339.3"
              strokeDashoffset={339.3 - (339.3 * value) / 100}
            />
          </svg>
          <div className={styles.gaugeContent}>
            <div className={styles.value}>{value}</div>
            <div className={styles.qualityLevel} style={{ color: qualityInfo.color }}>
              {qualityInfo.level}
            </div>
          </div>
        </div>
        <div className={styles.indicators}>
          <div className={styles.indicator}>
            <div className={styles.indicatorDot} style={{ backgroundColor: "#D22512" }}></div>
            <div className={styles.indicatorLabel}>Pobre</div>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorDot} style={{ backgroundColor: "#e9e9e9" }}></div>
            <div className={styles.indicatorLabel}>Moderado</div>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorDot} style={{ backgroundColor: "#4A5E69" }}></div>
            <div className={styles.indicatorLabel}>Bueno</div>
          </div>
          <div className={styles.indicator}>
            <div className={styles.indicatorDot} style={{ backgroundColor: "#feb10b" }}></div>
            <div className={styles.indicatorLabel}>Excelente</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

