import type React from "react"
import Card from "./card"
import styles from "./sun-intensity-card.module.css"

type IntensityLevel = "low" | "moderate" | "high" | "very-high" | "extreme"

interface SunIntensityCardProps {
  title: string
  uvIndex: number
}

export default function SunIntensityCard({ title, uvIndex }: SunIntensityCardProps) {
  // Determine intensity level based on UV index
  const getIntensityLevel = (index: number): IntensityLevel => {
    if (index <= 2) return "low"
    if (index <= 5) return "moderate"
    if (index <= 7) return "high"
    if (index <= 10) return "very-high"
    return "extreme"
  }

  const intensityLevel = getIntensityLevel(uvIndex)

  // Get color based on intensity level
  const getIntensityColor = (level: IntensityLevel): string => {
    switch (level) {
      case "low":
        return "#4CAF50" // Green
      case "moderate":
        return "#FFC107" // Yellow
      case "high":
        return "#FF9800" // Orange
      case "very-high":
        return "#FF5722" // Deep Orange
      case "extreme":
        return "#F44336" // Red
      default:
        return "#FFC107"
    }
  }

  const intensityColor = getIntensityColor(intensityLevel)

  return (
    <Card title={title}>
      <div className={styles.container}>
        <div className={styles.visualization}>
          <div className={styles.sunIntensity} style={{ "--intensity-color": intensityColor } as React.CSSProperties}>
            <div className={styles.sunCore}></div>
            <div className={styles.sunRays}></div>
            {intensityLevel === "high" || intensityLevel === "very-high" || intensityLevel === "extreme" ? (
              <div className={styles.heatWaves}>
                <div className={styles.heatWave} style={{ animationDelay: "0s" }}></div>
                <div className={styles.heatWave} style={{ animationDelay: "0.5s" }}></div>
                <div className={styles.heatWave} style={{ animationDelay: "1s" }}></div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{uvIndex}</span>
          <span className={styles.unit}>UV</span>
        </div>
        <div className={styles.intensityInfo}>
          <div className={styles.intensityIndicator} style={{ backgroundColor: intensityColor }}></div>
          <span className={styles.intensityText}>{intensityLevel.replace("-", " ")}</span>
        </div>
        <div className={styles.scale}>
          <div className={styles.scaleMarker} style={{ left: "0%" }}>
            0
          </div>
          <div className={styles.scaleMarker} style={{ left: "20%" }}>
            3
          </div>
          <div className={styles.scaleMarker} style={{ left: "40%" }}>
            6
          </div>
          <div className={styles.scaleMarker} style={{ left: "60%" }}>
            8
          </div>
          <div className={styles.scaleMarker} style={{ left: "80%" }}>
            11
          </div>
          <div className={styles.scaleMarker} style={{ left: "100%" }}>
            15+
          </div>
        </div>
      </div>
    </Card>
  )
}

