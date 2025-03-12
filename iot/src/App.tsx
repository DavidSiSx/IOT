import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas de ejemplo
import LoginPage from "./pages/login";
import RegisterPage from "./pages/registerPage";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta de login */}
          <Route path="/" element={<LoginPage />} />

          {/* Ruta de registro */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Ruta protegida: /dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Cualquier otra ruta, redirige al login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
