"use client"

import { useState, useEffect } from "react"
import { Droplets, Thermometer, LogOut, Cloud, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import Sidebar from "../components/ui/Sidebar"
import Topbar from "../components/ui/Topbar"
import MapComponent, { LocationData } from "../components/map-component"
import HistoricalCharts from "../components/historicalcharts"
import EliminatedParcels from "../components/eliminatedparcels"
import styles from "./Dashboard.module.css"

interface WeatherData {
  temperature: number | string
  humidity: number | string
  rain: number | string
  sunIntensity: number | string
}

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: "Cargando...",
    humidity: "Cargando...",
    rain: "Cargando...",
    sunIntensity: "Cargando...",
  })
  const [locations, setLocations] = useState<LocationData[]>([])
  const [selectedParcel, setSelectedParcel] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>("")

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get("http://localhost:3001/api/dump")
        const data = response.data
        console.log("Datos completos del backend:", data)

        // Procesar datos globales
        if (data.globales && data.globales.length > 0) {
          setWeatherData({
            temperature: data.globales[0].temperatura_global ?? "No disponible",
            humidity: data.globales[0].humedad_global ?? "No disponible",
            rain: data.globales[0].lluvia_global ?? "No disponible",
            sunIntensity: data.globales[0].sol_global ?? "No disponible",
          })
        }

        // Verificar la propiedad "parcelas" y transformarla
        if (data.parcelas) {
          console.log("data.parcelas:", data.parcelas)
          const active = data.parcelas
            .filter((p: any) => !p.is_deleted)
            .map((p: any) => {
              return {
                id: p.id,
                name: p.nombre,
                ubicacion: p.ubicacion,
                responsable: p.responsable,
                cultivo: p.tipo_cultivo,
                ultimo_riego: p.ultimo_riego,
                sensor: p.sensor,
                lat: parseFloat(p.latitud),
                lng: parseFloat(p.longitud),
              }
            })
          console.log("Parcelas activas transformadas:", active)
          setLocations(active)
          if (!selectedParcel && active.length > 0) {
            setSelectedParcel(active[0])
          }
        }

        setLastUpdate(new Date().toLocaleTimeString())
      } catch (err) {
        console.error("Error al obtener datos:", err)
        setError(
          `Error al obtener datos: ${
            err instanceof Error ? err.message : "Error desconocido"
          }`
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [selectedParcel])

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev)
  const handleCloseSidebar = () => setSidebarOpen(false)
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleMarkerSelect = (location: LocationData) => {
    setSelectedParcel(location)
  }

  if (loading && locations.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando datos...</p>
      </div>
    )
  }

  if (error && locations.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          Reintentar
        </button>
      </div>
    )
  }

  const parseNumber = (val: number | string): number => {
    if (typeof val === "number") return val
    const num = parseFloat(val)
    return isNaN(num) ? 0 : num
  }

  const temperatureVal = parseNumber(weatherData.temperature)
  const humidityVal = parseNumber(weatherData.humidity)
  const rainVal = parseNumber(weatherData.rain)
  const sunVal = parseNumber(weatherData.sunIntensity)

  return (
    <div className={styles.dashboardContainer}>
      <Topbar onToggleSidebar={handleToggleSidebar} user={user} onLogout={handleLogout} />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h1>IoT Monitor</h1>
            <p>Dashboard de dispositivos conectados</p>
            <p>Última actualización: {lastUpdate}</p>
          </div>
        </header>

        <div className={styles.dashboardLayout}>
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Ubicaciones en Cancún</h2>
            <div className={styles.mapCard}>
              <MapComponent locations={locations} onMarkerSelect={handleMarkerSelect} />
            </div>
          </div>

          <div className={styles.sensorsSection}>
            <div className={styles.sensorGrid}>
              <div className={styles.sensorCard}>
                <h3 className={styles.sensorTitle}>
                  <Thermometer className={styles.sensorIcon} size={20} />
                  Temperatura
                </h3>
                <div className={styles.sensorValue}>
                  {typeof weatherData.temperature === "number" ||
                  !isNaN(Number(weatherData.temperature))
                    ? `${weatherData.temperature} °C`
                    : weatherData.temperature}
                </div>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${(temperatureVal / 50) * 100}%` }}
                  ></div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>0 °C</span>
                  <span>50 °C</span>
                </div>
              </div>

              <div className={styles.sensorCard}>
                <h3 className={styles.sensorTitle}>
                  <Droplets className={styles.sensorIcon} size={20} />
                  Humedad
                </h3>
                <div className={styles.sensorValue}>
                  {typeof weatherData.humidity === "number" ||
                  !isNaN(Number(weatherData.humidity))
                    ? `${weatherData.humidity}%`
                    : weatherData.humidity}
                </div>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${humidityVal}%` }}
                  ></div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>0 %</span>
                  <span>100 %</span>
                </div>
              </div>

              <div className={styles.sensorCard}>
                <h3 className={styles.sensorTitle}>
                  <Cloud className={styles.sensorIcon} size={20} />
                  Prob. de Lluvia
                </h3>
                <div className={styles.sensorValue}>
                  {typeof weatherData.rain === "number" ||
                  !isNaN(Number(weatherData.rain))
                    ? `${weatherData.rain} %`
                    : weatherData.rain}
                </div>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${rainVal}%` }}
                  ></div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>0 %</span>
                  <span>100 %</span>
                </div>
              </div>

              <div className={styles.sensorCard}>
                <h3 className={styles.sensorTitle}>
                  <Sun className={styles.sensorIcon} size={20} />
                  Intensidad Solar
                </h3>
                <div className={styles.sensorValue}>
                  {typeof weatherData.sunIntensity === "number" ||
                  !isNaN(Number(weatherData.sunIntensity))
                    ? `${weatherData.sunIntensity} W/m²`
                    : weatherData.sunIntensity}
                </div>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${(sunVal / 100) * 100}%` }}
                  ></div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>0 W/m²</span>
                  <span>100 W/m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.historicalSection}>
          <HistoricalCharts parcelId={selectedParcel ? selectedParcel.id : 1} />
        </section>

        <section className={styles.eliminatedSection}>
          <EliminatedParcels />
        </section>
      </main>
    </div>
  );
}
