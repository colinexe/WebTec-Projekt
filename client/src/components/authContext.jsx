import React, { useState, useEffect } from "react";


const AuthContext = React.createContext(undefined);

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setAuthUser] = useState();
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/auth/checkstatus"); // Replace with your actual API endpoint
      const user = await response.json();
      console.log(user);

      if (user.auth === false) {
        console.log("not authed")
        setIsAuthenticated(false);
        setIsLoading(false);
      } else {
        console.log("authed")
        setIsAuthenticated(user.auth);
        setAuthUser(user);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);   
  
  if (isLoading) {
    return <div>Is Loading...</div>
  } 
  if (!isLoading ) {
    console.log("return child")
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {props.children}
      </AuthContext.Provider>
    );
  }

};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const authenticate = async () => {
  const response = await fetch("/auth/checkstatus"); // Replace with your actual API endpoint
  const status = await response.json();
  return new Promise((resolve, reject) => {
    if (status.auth === false) {
      window.location.href = "/";
      reject(false);
    } else {
      resolve(true);
    }
  });
}

export { AuthProvider, useAuth, authenticate };