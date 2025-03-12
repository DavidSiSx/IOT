import React from "react";
import { Home, LayoutDashboard, Cpu, FileText, Settings } from 'lucide-react';
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <a href="#">
            <Home size={20} />
            Inicio
          </a>
        </li>
        <li>
          <a href="#">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
        </li>
        <li>
          <a href="#">
            <Cpu size={20} />
            Dispositivos
          </a>
        </li>
        <li>
          <a href="#">
            <FileText size={20} />
            Reportes
          </a>
        </li>
        <li>
          <a href="#">
            <Settings size={20} />
            Configuración
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
