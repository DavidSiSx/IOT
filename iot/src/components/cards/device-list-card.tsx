import { Cpu, Thermometer, Droplets, Waves, Zap } from "lucide-react"
import Card from "./card"
import styles from "./device-list-card.module.css"

interface DeviceListCardProps {
  title: string
}

// Sample device data
const devices = [
  { id: 1, name: "Sensor de Temperatura", type: "Sensor", status: "online", icon: Thermometer, lastActive: "Ahora" },
  { id: 2, name: "Medidor de Humedad", type: "Sensor", status: "online", icon: Droplets, lastActive: "2m" },
  { id: 3, name: "Controlador Central", type: "Hub", status: "online", icon: Cpu, lastActive: "Ahora" },
  { id: 4, name: "Sensor de Movimiento", type: "Sensor", status: "offline", icon: Waves, lastActive: "1h" },
  { id: 5, name: "Medidor Eléctrico", type: "Medidor", status: "online", icon: Zap, lastActive: "5m" },
]

export default function DeviceListCard({ title }: DeviceListCardProps) {
  return (
    <Card title={title} size="tall">
      <div className={styles.container}>
        <div className={styles.list}>
          {devices.map((device) => {
            const Icon = device.icon
            return (
              <div key={device.id} className={styles.device}>
                <div className={`${styles.deviceIcon} ${styles[device.status]}`}>
                  <Icon size={18} />
                </div>
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>{device.name}</div>
                  <div className={styles.deviceMeta}>
                    <span className={styles.deviceType}>{device.type}</span>
                    <span className={styles.deviceDot}>•</span>
                    <span className={`${styles.deviceStatus} ${styles[device.status]}`}>{device.status}</span>
                  </div>
                </div>
                <div className={styles.deviceLastActive}>{device.lastActive}</div>
              </div>
            )
          })}
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>{devices.length}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Online</span>
            <span className={styles.summaryValue}>{devices.filter((d) => d.status === "online").length}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Offline</span>
            <span className={styles.summaryValue}>{devices.filter((d) => d.status === "offline").length}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

