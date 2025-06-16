import { useUserContext } from '../Context/UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  // if (!user) {
  //   // Not logged in, redirect to login page
  //   return <Navigate to="/signin" replace />;
  // }

  // // Logged in, render the page
  return children;
};

export default ProtectedRoute;