// src/services/Api.ts

import axios from "axios"

// Interfaz de sensores
export interface Sensor {
  humedad: number
  temperatura: number
  lluvia: number
  sol: number
}

// Interfaz de parcelas
export interface Parcela {
  id: number
  nombre: string
  latitud: number
  longitud: number
  responsable: string
  tipo_cultivo: string
  ultimo_riego: string
  sensor: Sensor
}

// Interfaz de la respuesta
export interface ApiResponse {
  sensores: Sensor
  parcelas: Parcela[]
}

// Ajusta /api según tu proxy en vite.config.ts o tu endpoint real
const API_URL = "/api"

export const getIotData = async (): Promise<ApiResponse | null> => {
  try {
    const response = await axios.get(API_URL)
    if (!response.data || typeof response.data !== "object") {
      throw new Error("La API devolvió datos inválidos.")
    }
    return response.data
  } catch (error) {
    console.error("Error al obtener datos de la API:", error)
    return null
  }
}
