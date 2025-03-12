"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import styles from "./RegisterPage.module.css"

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { register } = useAuth()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    }

    if (!formData.name) {
      newErrors.name = "El nombre es requerido"
      isValid = false
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
      isValid = false
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
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
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
      const success = await register(formData.name, formData.email, formData.password)

      if (success) {
        navigate("/")
      } else {
        setErrors({
          ...errors,
          general: "Error al registrar usuario. El email podría estar en uso.",
        })
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: "Error al registrar usuario. Por favor, intenta de nuevo.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h1>Crear Cuenta</h1>
          <p>Regístrate para acceder al dashboard IoT</p>
        </div>

        {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nombre
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={18} />
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Contraseña
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={styles.input}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
          </div>

          <div className={styles.passwordRequirements}>
            <p>La contraseña debe tener:</p>
            <ul>
              <li className={formData.password.length >= 6 ? styles.valid : ""}>Al menos 6 caracteres</li>
              <li className={/[A-Z]/.test(formData.password) ? styles.valid : ""}>Una letra mayúscula</li>
              <li className={/[a-z]/.test(formData.password) ? styles.valid : ""}>Una letra minúscula</li>
              <li className={/\d/.test(formData.password) ? styles.valid : ""}>Un número</li>
            </ul>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </button>

          <div className={styles.loginLink}>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </form>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h2>Únete a la plataforma IoT</h2>
          <p>Registra una cuenta para comenzar a monitorear y controlar tus dispositivos IoT desde cualquier lugar.</p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

