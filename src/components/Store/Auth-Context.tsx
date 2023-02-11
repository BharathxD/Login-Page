import React, { useState, useEffect } from "react";

interface authContextType {
  isLoggedIn: boolean;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
}

const AuthContext = React.createContext<authContextType>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // It runs only after the app starts again
  useEffect(() => {
    const storedUserLoginInformation: string | null =
      localStorage.getItem("isLoggedIn");
    if (storedUserLoginInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
