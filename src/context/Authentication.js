import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const localToken = localStorage.getItem("token");
  const [auth, setAuth] = useState(localToken || null);
  const authData = {
    auth,
    setAuth,
  };
  useEffect(() => {
    setAuth(localToken);
  }, [localToken]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
