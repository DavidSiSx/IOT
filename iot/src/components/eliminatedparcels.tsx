"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../pages/dashboard.module.css";

interface Parcela {
  id: number;
  nombre: string;
  ubicacion: string;
  responsable: string;
  tipo_cultivo: string;
  ultimo_riego: string;
  latitud: number;
  longitud: number;
  is_deleted: boolean;
}

export default function EliminatedParcels() {
  const [eliminated, setEliminated] = useState<Parcela[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Parcela[]>("http://localhost:3001/api/parcelas/eliminadas")
      .then((response) => {
        setEliminated(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar parcelas eliminadas:", err);
        setError("Error al cargar parcelas eliminadas.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando parcelas eliminadas...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (eliminated.length === 0) {
    return <div className={styles.noData}>No hay parcelas eliminadas.</div>;
  }

  return (
    <div className={styles.eliminatedParcels}>
      <h2>Parcelas Eliminadas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Responsable</th>
            <th>Tipo Cultivo</th>
            <th>Último Riego</th>
          </tr>
        </thead>
        <tbody>
          {eliminated.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.ubicacion}</td>
              <td>{p.responsable}</td>
              <td>{p.tipo_cultivo}</td>
              <td>{new Date(p.ultimo_riego).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
