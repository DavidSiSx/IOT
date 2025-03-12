"use client"

import { useEffect, useRef } from "react"
import Card from "./card"
import styles from "./mapbox-card.module.css"

interface MapboxCardProps {
  title: string
  accessToken: string
  latitude: number
  longitude: number
  zoom: number
}

export default function MapboxCard({ title, accessToken, latitude, longitude, zoom }: MapboxCardProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    // Check if mapboxgl is available (it should be loaded via script tag)
    if (!window.mapboxgl) {
      console.error("Mapbox GL JS is not loaded. Please include the Mapbox GL JS script in your HTML.")
      return
    }

    // Initialize the map only once
    if (!mapRef.current && mapContainerRef.current) {
      window.mapboxgl.accessToken = accessToken

      mapRef.current = new window.mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/dark-v11", // Use a dark style to match the theme
        center: [longitude, latitude],
        zoom: zoom,
        attributionControl: false,
      })

      // Add navigation controls
      mapRef.current.addControl(
        new window.mapboxgl.NavigationControl({
          showCompass: false,
        }),
        "top-right",
      )

      // Add a marker at the center
      new window.mapboxgl.Marker({
        color: "#feb10b",
      })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current)

      // Add a pulsing dot
      mapRef.current.on("load", () => {
        // Add a source and layer for the pulsing dot
        mapRef.current.addSource("dot-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
                properties: {},
              },
            ],
          },
        })

        // Add a layer for the pulsing dot
        mapRef.current.addLayer({
          id: "layer-with-pulsing-dot",
          type: "circle",
          source: "dot-point",
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 7, 5, 16, 10],
            "circle-color": "#feb10b",
            "circle-opacity": 0.3,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#feb10b",
          },
        })
      })
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [accessToken, latitude, longitude, zoom])

  return (
    <Card title={title}>
      <div className={styles.container}>
        <div className={styles.mapContainer} ref={mapContainerRef}></div>
        <div className={styles.coordinates}>
          <div className={styles.coordinateItem}>
            <span className={styles.coordinateLabel}>Lat:</span>
            <span className={styles.coordinateValue}>{latitude.toFixed(6)}</span>
          </div>
          <div className={styles.coordinateItem}>
            <span className={styles.coordinateLabel}>Lng:</span>
            <span className={styles.coordinateValue}>{longitude.toFixed(6)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Add this type definition for the global mapboxgl object
declare global {
  interface Window {
    mapboxgl: any
  }
}

