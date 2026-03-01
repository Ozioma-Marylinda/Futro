import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;