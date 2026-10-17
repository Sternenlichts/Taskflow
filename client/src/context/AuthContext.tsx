import React, { createContext, useEffect, useState, useContext } from "react";

interface UserI {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar: string | null;
}

interface AuthContextI {
  user: UserI | null;
  token: string | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (token: string, user: UserI) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextI | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserI | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((user) => setUser(user))
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (newToken: string, newUser: UserI) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuth: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
