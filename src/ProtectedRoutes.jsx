
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { userStore } from "./stores/UserStore";


const ProtectedRoutes = () => {
  const useAuth = () => {
    const authData = localStorage.getItem('user')
    return authData
  };
  
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
