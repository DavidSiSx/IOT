import Card from "./card"
import styles from "./distance-card.module.css"

interface DistanceCardProps {
  title: string
  value: number
  unit: string
}

export default function DistanceCard({ title, value, unit }: DistanceCardProps) {
  return (
    <Card title={title}>
      <div className={styles.container}>
        <div className={styles.visualization}>
          <div className={styles.sensor}></div>
          <div className={styles.waves}>
            <div className={styles.wave} style={{ animationDelay: "0s" }}></div>
            <div className={styles.wave} style={{ animationDelay: "0.2s" }}></div>
            <div className={styles.wave} style={{ animationDelay: "0.4s" }}></div>
          </div>
          <div className={styles.object} style={{ left: `${Math.min(80, (value / 300) * 80)}%` }}></div>
        </div>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{value}</span>
          <span className={styles.unit}>{unit}</span>
        </div>
        <div className={styles.scale}>
          <div className={styles.scaleMarker} style={{ left: "0%" }}>
            0
          </div>
          <div className={styles.scaleMarker} style={{ left: "25%" }}>
            75
          </div>
          <div className={styles.scaleMarker} style={{ left: "50%" }}>
            150
          </div>
          <div className={styles.scaleMarker} style={{ left: "75%" }}>
            225
          </div>
          <div className={styles.scaleMarker} style={{ left: "100%" }}>
            300+
          </div>
        </div>
      </div>
    </Card>
  )
}

