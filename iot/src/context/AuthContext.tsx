"use client"; // Si lo usas con Next.js o quieres habilitar el "modo cliente"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Tipado (opcional en TS)
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Provider para envolver la app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar, revisa si hay usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parseando el usuario de localStorage", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Simulación de login
  const login = async (email: string, password: string): Promise<boolean> => {
    // Pequeño delay simulado
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Obtenemos la lista de usuarios (también guardada en localStorage)
    const usersJson = localStorage.getItem("users") || "[]";
    let users: any[] = [];
    try {
      users = JSON.parse(usersJson);
    } catch (error) {
      console.error("Error parseando la lista de usuarios", error);
      return false;
    }

    // Buscamos un usuario con email+contraseña coincidente
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Quitamos la password antes de guardar en el estado
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }

    // Si no coincide, devolvemos false
    return false;
  };

  // Simulación de registro
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const usersJson = localStorage.getItem("users") || "[]";
    let users: any[] = [];
    try {
      users = JSON.parse(usersJson);
    } catch (error) {
      console.error("Error parseando la lista de usuarios", error);
      return false;
    }

    // Verificamos si el email ya está registrado
    if (users.some((u) => u.email === email)) {
      return false; // Indica que ya existe
    }

    // Creamos un nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Guardamos el usuario loggeado (sin la password) en el estado
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    return true;
  };

  // Logout: borra el estado y localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
