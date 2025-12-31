import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: {
    url: string;
    public_id?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: { username?: string; email?: string; password: string }) => Promise<void>;
  register: (data: FormData) => Promise<void>;
  logout: () => Promise<void>;
  updateAvatar: (data: FormData) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Always ask backend if user is logged in
  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run once on app load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (data: { username?: string; email?: string; password: string }) => {
    const res = await api.post("/users/login", data);
    setUser(res.data.data.user);
  };

  const register = async (data: FormData) => {
    const res = await api.post("/users/register", data);
    setUser(res.data.data);
  };

  const logout = async () => {
    await api.post("/users/logout");
    setUser(null);
  };

  const updateAvatar = async (data: FormData) => {
    const res = await api.patch("/users/update-avatar", data);
    setUser(res.data.data);
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    await api.post("/users/change-password", { oldPassword, newPassword });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateAvatar,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
