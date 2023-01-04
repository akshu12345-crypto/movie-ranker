import { Navigate, Outlet, useLocation } from 'react-router-dom';

// const useAuth = () => {
//   return;
// };

const ProtectedRoutes = () => {
  var Suser = JSON.parse(localStorage.getItem("userIn"));
  //   const isAuth = useAuth();
  const location = useLocation();
  return Suser && Suser._id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={location.pathname} replace />
  );
};

export default ProtectedRoutes;
