import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const apiUrl = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (!token) return;

    try {
      const response = await fetch(apiUrl + "/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  const login = async (loginDto) => {
    const { email, password } = loginDto;
    const response = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setToken(data.token);
      setUser(data.user);
      await fetchUser();
      localStorage.setItem("jwt", data.token);
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const signUp = async (signUpDto) => {
    const { email, password, name, surname } = signUpDto;
    const response = await fetch(apiUrl + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, surname }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(response)
    } else {
      throw new Error(data.message || "registration failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, signUp, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
