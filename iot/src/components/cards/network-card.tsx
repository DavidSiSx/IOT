import type { ReactNode } from "react"
import Card from "./card"
import styles from "./network-card.module.css"

interface NetworkCardProps {
  title: string
  status: string
  signal: number
  icon?: ReactNode
  lastUpdate?: string
}

export default function NetworkCard({ title, status, signal, icon, lastUpdate }: NetworkCardProps) {
  // Generate signal bars
  const signalBars = Array.from({ length: 5 }, (_, i) => {
    const isActive = i < signal
    return (
      <div
        key={i}
        className={`${styles.signalBar} ${isActive ? styles.active : ""}`}
        style={{ height: `${(i + 1) * 4 + 8}px` }}
      />
    )
  })

  return (
    <Card title={title}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <div className={styles.statusIndicator}>
            <div
              className={`${styles.statusDot} ${status === "Conectado" ? styles.connected : styles.disconnected}`}
            ></div>
          </div>
          <div className={styles.statusInfo}>
            <div className={styles.statusText}>{status}</div>
            <div className={styles.statusDetails}>{status === "Conectado" ? "Red estable" : "Sin conexión"}</div>
          </div>
        </div>

        <div className={styles.signalContainer}>
          <div className={styles.signalStrength}>
            <div className={styles.signalLabel}>Intensidad de señal</div>
            <div className={styles.signalValue}>{signal}/5</div>
          </div>
          <div className={styles.signalBars}>{signalBars}</div>
        </div>

        <div className={styles.networkInfo}>
          <div className={styles.networkItem}>
            <div className={styles.networkLabel}>API</div>
            <div className={styles.networkValue}>moriahmkt.com/iotapp</div>
          </div>
          <div className={styles.networkItem}>
            <div className={styles.networkLabel}>Última actualización</div>
            <div className={styles.networkValue}>{lastUpdate || "Desconocido"}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

