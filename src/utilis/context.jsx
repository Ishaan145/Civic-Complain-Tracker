import { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext(null);

// AuthContext Provider component
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update or clear user
  const updateUser = (userData) => {
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.removeItem("user");
    }
    setCurrentUser(userData);
  };

  // Sync on user change (optional redundancy, can be skipped if you use `updateUser` only)
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
