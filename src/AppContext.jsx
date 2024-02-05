import React, { useState, createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
const CONSTANTS = {
  ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
};
const AppContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  function doLogin(token) {
    if (!token) {
      setToken(null);
      setIsAdmin(false);
      setUserId(null);
      return;
    }

    setToken(token);
    let claims = jwtDecode(token);
    if (Array.isArray(claims[CONSTANTS.ROLE])) {
      setIsAdmin(true);
    }
    setUserId(+claims.Id);
    console.log("token", token);
    console.log("claims", claims);
    console.log("userid", userId);
  }

  function logout() {
    localStorage.removeItem("token");
    doLogin(null);
  }

  useEffect(() => {
    doLogin(localStorage.getItem("token") || "");
  }, []);

  return (
    <AppContext.Provider value={{ token, doLogin, logout, isAdmin, userId }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AuthProvider };
