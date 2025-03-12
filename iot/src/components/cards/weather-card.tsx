import Card from "./card"
import styles from "./weather-card.module.css"

// Define weather types
type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'stormy';

interface WeatherCardProps {
  title: string
  temperature: number
  weatherType: WeatherType
  rainProbability: number
}

export default function WeatherCard({ title, temperature, weatherType, rainProbability }: WeatherCardProps) {
  return (
    <Card title={title}>
      <div className={styles.container}>
        <div className={styles.visualization}>
          <div className={styles.weatherIcon}>
            {weatherType === 'sunny' && (
              <div className={styles.sunny}>
                <div className={styles.sunCore}></div>
                <div className={styles.sunRays}></div>
              </div>
            )}
            {weatherType === 'cloudy' && (
              <div className={styles.cloudy}>
                <div className={styles.cloud}></div>
                <div className={styles.cloud} style={{ animationDelay: "1.5s" }}></div>
              </div>
            )}
            {weatherType === 'rainy' && (
              <div className={styles.rainy}>
                <div className={styles.cloud}></div>
                <div className={styles.raindrops}>
                  <div className={styles.raindrop} style={{ animationDelay: "0s" }}></div>
                  <div className={styles.raindrop} style={{ animationDelay: "0.2s" }}></div>
                  <div className={styles.raindrop} style={{ animationDelay: "0.4s" }}></div>
                  <div className={styles.raindrop} style={{ animationDelay: "0.6s" }}></div>
                  <div className={styles.raindrop} style={{ animationDelay: "0.8s" }}></div>
                </div>
              </div>
            )}
            {weatherType === 'stormy' && (
              <div className={styles.stormy}>
                <div className={styles.cloud}></div>
                <div className={styles.lightning}></div>
                <div className={styles.raindrops}>
                  <div className={styles.raindrop} style={{ animationDelay: "0s" }}></div>
                  <div className={styles.raindrop} style={{ animationDelay: "0.3s" }}></div>
                  <div className={styles.raindrop} style={{ animationDelay: "0.5s" }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.valueContainer}>
          <span className={styles.value}>{temperature}</span>
          <span className={styles.unit}>°C</span>
        </div>
        <div className={styles.rainInfo}>
          <div className={styles.rainIcon}></div>
          <span className={styles.rainProbability}>{rainProbability}%</span>
        </div>
        <div className={styles.scale}>
          <div className={styles.scaleMarker} style={{ left: "0%" }}>
            0°
          </div>
          <div className={styles.scaleMarker} style={{ left: "25%" }}>
            10°
          </div>
          <div className={styles.scaleMarker} style={{ left: "50%" }}>
            20°
          </div>
          <div className={styles.scaleMarker} style={{ left: "75%" }}>
            30°
          </div>
          <div className={styles.scaleMarker} style={{ left: "100%" }}>
            40°+
          </div>
        </div>
      </div>
    </Card>
  )
}
