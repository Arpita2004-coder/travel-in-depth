import { createContext, useState, useEffect } from "react";
import * as authApi from "../../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, verify it and restore the session.
  // The `active` flag prevents a late/duplicate response (e.g. from
  // React.StrictMode's double-invoke in dev) from overwriting good state.
  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .getMe()
      .then((data) => {
        if (active) setUser(data);
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem("token");
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const signup = async (name, email, password) => {
    const data = await authApi.signup(name, email, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};