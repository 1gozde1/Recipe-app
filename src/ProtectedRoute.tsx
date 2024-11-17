import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./modules/user/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode; // children React bileşenlerini temsil ediyor
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser(); // UserContext'ten user bilgisini alıyor

  if (!user) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendiriyor
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı giriş yapmışsa, korunan içeriği gösteriyor
  return <>{children}</>;
};
