import { Navigate } from "react-router-dom";
import { useUser } from "./modules/user/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); // UserContext'ten user bilgisini alıyor

  if (!user) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendiriyor
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı giriş yapmışsa, korunan içeriği gösteriyo
  return children;
};
