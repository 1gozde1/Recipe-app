import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    
    const token = localStorage.getItem("token"); // kullanıcı bilgileri token olarak saklanıyor 

    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
