"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import styles from "./LoginPage.module.css"

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: "",
      password: "",
      general: "",
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const success = await login(formData.email, formData.password)

      if (success) {
        navigate("/dashboard")
      } else {
        setErrors({
          ...errors,
          general: "Credenciales inválidas. Por favor, intenta de nuevo.",
        })
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: "Error al iniciar sesión. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>IoT Monitor</h1>
          <p>Inicia sesión para acceder al dashboard</p>
        </div>

        {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={18} />
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={styles.input}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          <div className={styles.forgotPassword}>
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          <div className={styles.registerLink}>
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </div>
        </form>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h2>Monitorea tus dispositivos IoT</h2>
          <p>Accede a todas las métricas y datos de tus dispositivos conectados en tiempo real.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

