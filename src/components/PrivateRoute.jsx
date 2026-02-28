import { Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();
  if (!user.isLoggedIn) return <Navigate to="/signin" />;
  return children;
};

export default PrivateRoute;