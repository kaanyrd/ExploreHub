import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const localToken = localStorage.getItem("token");
  const lastLogs = localStorage.getItem("LastLogins");
  const loginData = JSON.parse(lastLogs);
  const [auth, setAuth] = useState(localToken || null);
  const [lastLogins, setLastLogins] = useState(loginData || []);
  localStorage.setItem("LastLogins", JSON.stringify(lastLogins));

  const authData = {
    auth,
    setAuth,
    lastLogins,
    setLastLogins,
  };

  useEffect(() => {
    setAuth(localToken);
  }, [localToken]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
