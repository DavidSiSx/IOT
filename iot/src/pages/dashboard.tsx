"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Droplets, Thermometer } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import TemperatureCard from "../components/cards/temperature-card"
import HumidityCard from "../components/cards/humidity-card"
import WeatherCard from "../components/cards/weather-card"
import MapboxCard from "../components/cards/mapbox-card"
import SunIntensityCard from "../components/cards/sun-intensity-card"
import styles from "./dashboard.module.css"
import Topbar from "../components/ui/Topbar"
import Sidebar from "../components/ui/Sidebar"
import { useState } from "react"

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className={styles.dashboardContainer}>
      <Topbar onToggleSidebar={handleToggleSidebar} user={user} onLogout={handleLogout} />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      <main className={styles.mainContent}>
        <div className={styles.grid}>
          <div className={styles.mapSection}>
            <MapboxCard
              title="Location"
              accessToken="pk.eyJ1IjoiZGF2aWRzaXN4IiwiYSI6ImNtNGdoNjkzMzFsODgyaXBzbXQxdHdjdXcifQ.cbBB4nPaDF9XmhdD-Hdolw"
              latitude={21.110932194251735}
              longitude={-86.82463316475018}
              zoom={14}
            />
          </div>

          <div className={styles.rightSection}>
            <div className={styles.upperCards}>
              <WeatherCard title="Weather" temperature={24} weatherType="sunny" rainProbability={10} />

              <SunIntensityCard title="UV Index" uvIndex={1} />
            </div>

            <div className={styles.lowerCards}>
              <TemperatureCard
                title="Temperature"
                value={24.5}
                unit="°C"
                icon={<Thermometer />}
                trend="up"
                min={18}
                max={30}
              />

              <HumidityCard title="Humidity" value={65} unit="%" icon={<Droplets />} />
            </div>
          </div>
        </div>
      </main>
      <section className={styles.footer}> 
        <p>Todos los derechos reservados</p>
      </section>
    </div>
  )
}

export default Dashboard

