import type { ReactNode } from "react"
import Card from "./card"
import styles from "./humidity-card.module.css"

interface HumidityCardProps {
  title: string
  value: number
  unit: string
  icon?: ReactNode
}

export default function HumidityCard({ title, value, unit, icon }: HumidityCardProps) {
  // Calculate the rotation for the gauge based on humidity value
  const rotation = (value / 100) * 180

  return (
    <Card title={title}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.gaugeContainer}>
        <div className={styles.gauge}>
          <div className={styles.gaugeBody}>
            <div className={styles.gaugeProgress} style={{ transform: `rotate(${rotation}deg)` }} />
            <div className={styles.gaugeFill} style={{ opacity: value / 100 }} />
            <div className={styles.gaugeCenter}>
              <span className={styles.value}>
                {value}
                <span className={styles.unit}>{unit}</span>
              </span>
            </div>
          </div>
          <div className={styles.gaugeMarkers}>
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

