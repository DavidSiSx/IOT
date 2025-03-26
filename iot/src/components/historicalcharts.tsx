"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import styles from "./HistoricalCharts.module.css";

interface HistoricalRecord {
  id: number;
  parcela_id: number;
  fecha_registro: string;
  humedad: number;
  temperatura: number;
  lluvia: number;
  sol: number;
}

interface HistoricalChartsProps {
  parcelId: number;
}

export default function HistoricalCharts({ parcelId }: HistoricalChartsProps) {
  const [historicalData, setHistoricalData] = useState<HistoricalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<HistoricalRecord[]>(`http://localhost:3001/api/historico/parcelas/${parcelId}`)
      .then((response) => {
        setHistoricalData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener histórico:", err);
        setLoading(false);
      });
  }, [parcelId]);

  const labels = historicalData.map((item) =>
    new Date(item.fecha_registro).toLocaleString()
  );
  const tempData = historicalData.map((item) => item.temperatura);
  const humData = historicalData.map((item) => item.humedad);
  const rainData = historicalData.map((item) => item.lluvia);
  const solData = historicalData.map((item) => item.sol);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: tempData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Humedad (%)",
        data: humData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Lluvia",
        data: rainData,
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
      {
        label: "Sol",
        data: solData,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Baja", "Media", "Alta"],
    datasets: [
      {
        data: [
          tempData.filter((t) => t < 20).length,
          tempData.filter((t) => t >= 20 && t < 30).length,
          tempData.filter((t) => t >= 30).length,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(255, 99, 132, 0.7)",
        ],
      },
    ],
  };

  if (loading)
    return <p className={styles.loading}>Cargando datos históricos...</p>;

  return (
    <div className={styles.historicalChartsContainer}>
      <h2>Histórico de Sensores (Parcela {parcelId})</h2>
      <div className={styles.chartItem}>
        <h3>Gráfica de Líneas: Temperatura & Humedad</h3>
        <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className={styles.chartItem}>
        <h3>Gráfica de Barras: Lluvia & Sol</h3>
        <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className={styles.chartItem}>
        <h3>Gráfica de Pastel: Distribución de Temperatura</h3>
        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
