import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  // TODO: replace with actual value from User context when it is available

  const userLoggedIn = true;
  return userLoggedIn ? children : <Navigate to="/login" replace={true} />;
};
