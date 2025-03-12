"use client"

import type React from "react"
import { useState } from "react"
import "./Topbar.css"
import { Menu, Bell, User, LogOut } from "lucide-react"

interface TopbarProps {
  onToggleSidebar: () => void
  user: { name: string; email: string } | null
  onLogout: () => void
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onToggleSidebar}>
        <Menu size={24} />
      </button>

      <div className="topbar-title">IoT Dashboard</div>

      <div className="topbar-actions">
        <button className="notification-btn">
          <Bell size={24} />
        </button>
        <div className="user-menu-container">
          <button className="profile-btn" onClick={toggleUserMenu}>
            <User size={24} />
          </button>
          {showUserMenu && user && (
            <div className="user-menu">
              <p className="user-email">{user.email}</p>
              <button className="logout-btn" onClick={onLogout}>
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar

