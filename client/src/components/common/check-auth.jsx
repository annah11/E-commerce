import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  console.log(location.pathname, isAuthenticated);

  // Redirect unauthenticated users to login, with an exception for login/register routes
  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users from login/register to their respective dashboard
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/shop/home"} />;
  }

  // Redirect authenticated users with role-based access control
  if (isAuthenticated) {
    // Redirect non-admin users away from admin routes
    if (!isAdmin && location.pathname.includes("/admin")) {
      return <Navigate to="/unauth-page" />;
    }

    // Redirect admin users away from shop routes
    if (isAdmin && location.pathname.includes("/shop")) {
      return <Navigate to="/admin/dashboard" />;
    }

    // Redirect to the appropriate home page when visiting the root "/"
    if (location.pathname === "/") {
      return <Navigate to={isAdmin ? "/admin/dashboard" : "/shop/home"} />;
    }
  }

  // If none of the conditions are met, render children components
  return <>{children}</>;
}

export default CheckAuth;
