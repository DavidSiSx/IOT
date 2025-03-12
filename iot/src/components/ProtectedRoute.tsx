import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mientras carga el estado de autenticación, puedes mostrar algo
  if (isLoading) {
    return <div style={{ padding: "2rem" }}>Cargando...</div>;
  }

  // Si no hay usuario, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderiza el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
