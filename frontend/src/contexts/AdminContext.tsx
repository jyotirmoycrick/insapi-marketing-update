import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: any;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        // Check if admin token exists (for dashboard)
        const adminToken = localStorage.getItem('admin_token');
        if (adminToken) {
          // Dashboard uses token-based auth, not /auth/me
          setIsAdmin(true);
          setUser({ token: adminToken });
          setIsLoading(false);
          return;
        }
        
        // Try to get current user (for other admin features)
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
        setIsAdmin(true);
      } catch (error) {
        // Silently fail - user is not logged in
        setIsAdmin(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    setUser(response.user);
    setIsAdmin(true);
    setIsLoading(false);
  };

  const logout = () => {
    authAPI.logout();
    setIsAdmin(false);
    setIsEditMode(false);
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ isAdmin, isEditMode, setIsEditMode, login, logout, user }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
