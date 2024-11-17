import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Kullanıcı bilgilerini temsil eden bir arayüz tanımlıyoruz
interface User {
  token: string;
  email?: string;
}

// Context'in türlerini tanımlıyoruz
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Context'leri oluşturuyoruz
export const UserContext = createContext<UserContextType | undefined>(undefined);

// useUser Hook: UserContext'i güvenli bir şekilde kullanır
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider bileşeni türlendirilmiş
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Kullanıcı bilgileri token olarak saklanıyor
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (userData: User): void => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
