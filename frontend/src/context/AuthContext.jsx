import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/auth"
      : "/api/auth";

  // Fetch current user on mount
  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        credentials: "include", // important for cookies
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null); // update context immediately
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
