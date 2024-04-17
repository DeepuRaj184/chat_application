import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Initialize currentUser from localStorage or sessionStorage
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    return storedUser || {};
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Store user in localStorage or sessionStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
    });

    return () => {
      unsub();
    };
  }, []);
  console.log(currentUser)
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
