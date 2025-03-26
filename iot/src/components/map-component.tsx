"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import styles from "./map-component.module.css"
import { X } from "lucide-react"

// Sustituye con tu token de Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiZGF2aWRzaXN4IiwiYSI6ImNtNGdoNjkzMzFsODgyaXBzbXQxdHdjdXcifQ.cbBB4nPaDF9XmhdD-Hdolw"

export interface SensorData {
  humedad: number
  temperatura: number
  lluvia: number
  sol: number
}

export interface LocationData {
  id: number
  name: string
  ubicacion: string
  responsable: string
  cultivo: string
  ultimo_riego: string
  sensor?: SensorData
  lat: number
  lng: number
}

interface MapComponentProps {
  locations?: LocationData[]
  onMarkerSelect?: (location: LocationData) => void
}

export default function MapComponent({ locations = [], onMarkerSelect }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const markers = useRef<mapboxgl.Marker[]>([])

  // State for the modal
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-86.8475, 21.1619],
        zoom: 12,
      })
      map.current.on("load", () => {
        setMapLoaded(true)
      })
    }
    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !map.current) return

    // Filtrar sólo ubicaciones válidas
    const validLocations = locations.filter((loc) => {
      const lat = Number.parseFloat(String(loc.lat))
      const lng = Number.parseFloat(String(loc.lng))
      return !isNaN(lat) && !isNaN(lng)
    })

    console.log("Valid locations:", validLocations)

    // Limpiar marcadores anteriores
    markers.current.forEach((marker) => marker.remove())
    markers.current = []

    if (validLocations.length === 0) return

    const bounds = new mapboxgl.LngLatBounds()

    validLocations.forEach((loc) => {
      const latitude = Number.parseFloat(String(loc.lat))
      const longitude = Number.parseFloat(String(loc.lng))

      // Crear el marcador con su elemento
      const el = document.createElement("div")
      el.className = styles.marker

      // Crear el Marker sin popup
      const marker = new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map.current!)

      // Manejar el clic en el marcador
      marker.getElement().addEventListener("click", () => {
        // Highlight the selected marker
        markers.current.forEach((m) => {
          m.getElement().classList.remove(styles.selectedMarker)
        })
        el.classList.add(styles.selectedMarker)

        // Set the selected location and show the modal
        setSelectedLocation(loc)
        setShowModal(true)

        if (onMarkerSelect) onMarkerSelect(loc)
      })

      markers.current.push(marker)
      bounds.extend([longitude, latitude])
    })

    if (validLocations.length > 1) {
      map.current.fitBounds(bounds, { padding: 50 })
    } else if (validLocations.length === 1) {
      map.current.flyTo({
        center: [Number.parseFloat(String(validLocations[0].lng)), Number.parseFloat(String(validLocations[0].lat))],
        zoom: 14,
      })
    }
  }, [locations, mapLoaded, onMarkerSelect])

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapContainer} className={styles.mapContainer} />

      {/* Modal */}
      {showModal && selectedLocation && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              <X size={20} />
            </button>

            <h2 className={styles.modalTitle}>{selectedLocation.name}</h2>

            <div className={styles.modalContent}>
              <div className={styles.infoSection}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Ubicación:</span>
                  <span className={styles.infoValue}>{selectedLocation.ubicacion}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Responsable:</span>
                  <span className={styles.infoValue}>{selectedLocation.responsable}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Cultivo:</span>
                  <span className={styles.infoValue}>{selectedLocation.cultivo}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Último riego:</span>
                  <span className={styles.infoValue}>{selectedLocation.ultimo_riego}</span>
                </div>
              </div>

              {selectedLocation.sensor && (
                <div className={styles.sensorSection}>
                  <h3 className={styles.sensorTitle}>Datos del sensor</h3>

                  <div className={styles.sensorGrid}>
                    <div className={styles.sensorItem}>
                      <span className={styles.sensorLabel}>Temperatura</span>
                      <span className={styles.sensorValue}>{selectedLocation.sensor.temperatura} °C</span>
                    </div>

                    <div className={styles.sensorItem}>
                      <span className={styles.sensorLabel}>Humedad</span>
                      <span className={styles.sensorValue}>{selectedLocation.sensor.humedad} %</span>
                    </div>

                    <div className={styles.sensorItem}>
                      <span className={styles.sensorLabel}>Lluvia</span>
                      <span className={styles.sensorValue}>{selectedLocation.sensor.lluvia}</span>
                    </div>

                    <div className={styles.sensorItem}>
                      <span className={styles.sensorLabel}>Sol</span>
                      <span className={styles.sensorValue}>{selectedLocation.sensor.sol}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

