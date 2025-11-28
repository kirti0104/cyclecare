import { Navigate } from "react-router";
import { isAuthenticated } from "./Auth";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    // User not authenticated, redirect to signin page
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
