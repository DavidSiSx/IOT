import { Cpu, Thermometer, Droplets, Cloud, Sun } from "lucide-react"
import Card from "./card"
import type { Parcela } from "../../Services/Api"
import styles from "./device-list-card.module.css"

interface DeviceListCardProps {
  title: string
  parcelas?: Parcela[]
}

export default function DeviceListCard({ title, parcelas = [] }: DeviceListCardProps) {
  // Determinar el icono basado en el tipo de cultivo
  const getIcon = (tipoCultivo: string) => {
    switch (tipoCultivo.toLowerCase()) {
      case "tomate":
        return Thermometer
      case "maíz":
        return Sun
      case "papa":
        return Droplets
      case "arroz":
        return Cloud
      default:
        return Cpu
    }
  }

  // Determinar el estado basado en la humedad
  const getStatus = (humedad: number) => {
    if (humedad > 60) return "online"
    if (humedad > 30) return "warning"
    return "offline"
  }

  // Calcular tiempo desde el último riego
  const getLastActive = (ultimoRiego: string) => {
    const riegoDate = new Date(ultimoRiego)
    const now = new Date()
    const diffMs = now.getTime() - riegoDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) return `${diffMins}m`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`
    return `${Math.floor(diffMins / 1440)}d`
  }

  return (
    <Card title={title} size="tall">
      <div className={styles.container}>
        <div className={styles.list}>
          {parcelas.map((parcela) => {
            const Icon = getIcon(parcela.tipo_cultivo)
            const status = getStatus(parcela.sensor.humedad)
            return (
              <div key={parcela.id} className={styles.device}>
                <div className={`${styles.deviceIcon} ${styles[status]}`}>
                  <Icon size={18} />
                </div>
                <div className={styles.deviceInfo}>
                  <div className={styles.deviceName}>{parcela.nombre}</div>
                  <div className={styles.deviceMeta}>
                    <span className={styles.deviceType}>{parcela.tipo_cultivo}</span>
                    <span className={styles.deviceDot}>•</span>
                    <span className={`${styles.deviceStatus} ${styles[status]}`}>
                      {status === "online" ? "Óptimo" : status === "warning" ? "Atención" : "Crítico"}
                    </span>
                  </div>
                </div>
                <div className={styles.deviceLastActive}>{getLastActive(parcela.ultimo_riego)}</div>
              </div>
            )
          })}
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>{parcelas.length}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Óptimo</span>
            <span className={styles.summaryValue}>{parcelas.filter((p) => p.sensor.humedad > 60).length}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Crítico</span>
            <span className={styles.summaryValue}>{parcelas.filter((p) => p.sensor.humedad <= 30).length}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

