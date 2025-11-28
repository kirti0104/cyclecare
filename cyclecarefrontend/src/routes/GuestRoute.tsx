import { Navigate } from "react-router";
import { isAuthenticated } from "./Auth";

interface GuestRouteProps {
  children: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    // User is authenticated, redirect to home page
    return <Navigate to="/" />;
  }
  return children;
};

export default GuestRoute;
