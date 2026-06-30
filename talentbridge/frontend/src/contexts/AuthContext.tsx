import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'student' | 'company') => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData, role: 'student' | 'company') => Promise<{ success: boolean; error?: string }>;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getUser: () => User | null;
}

interface RegisterData {
  name?: string;
  companyName?: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('tb_token');
    const storedUser = localStorage.getItem('tb_user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('tb_token');
        localStorage.removeItem('tb_user');
      }
    }
  }, []);

  const saveSession = (token: string, user: User) => {
    localStorage.setItem('tb_token', token);
    localStorage.setItem('tb_user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  // Student or Company login
  const login = async (
    email: string,
    password: string,
    role: 'student' | 'company'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const endpoint = role === 'student' ? '/students/login' : '/companies/login';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || 'Login failed.' };
      }

      saveSession(data.token, data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Is the server running?' };
    }
  };

  // Student or Company register
  const register = async (
    formData: RegisterData,
    role: 'student' | 'company'
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const endpoint = role === 'student' ? '/students/register' : '/companies/register';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || 'Registration failed.' };
      }

      saveSession(data.token, data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Is the server running?' };
    }
  };

  // Admin login
  const adminLogin = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || 'Invalid admin credentials.' };
      }

      saveSession(data.token, data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error. Is the server running?' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tb_token');
    localStorage.removeItem('tb_user');
  };

  const getUser = () => user;

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!user, login, register, adminLogin, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
