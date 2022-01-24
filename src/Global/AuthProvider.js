import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
