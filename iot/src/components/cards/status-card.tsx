import Card from "./card"
import styles from "./status-card.module.css"

interface StatusCardProps {
  title: string
  activeDevices: number
  totalDevices: number
}

export default function StatusCard({ title, activeDevices, totalDevices }: StatusCardProps) {
  const percentage = (activeDevices / totalDevices) * 100

  // Generate device indicators
  const deviceIndicators = Array.from({ length: totalDevices }, (_, i) => {
    const isActive = i < activeDevices
    return <div key={i} className={`${styles.deviceIndicator} ${isActive ? styles.active : styles.inactive}`} />
  })

  return (
    <Card title={title}>
      <div className={styles.container}>
        <div className={styles.statusInfo}>
          <div className={styles.percentage}>{Math.round(percentage)}%</div>
          <div className={styles.deviceCount}>
            <span className={styles.activeCount}>{activeDevices}</span>
            <span className={styles.separator}>/</span>
            <span className={styles.totalCount}>{totalDevices}</span>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
        </div>

        <div className={styles.deviceGrid}>{deviceIndicators}</div>
      </div>
    </Card>
  )
}

