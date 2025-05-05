import { useAuth } from "@/auth/hooks/use-auth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/auth/login",
}) => {
  const { isAuthenticated } = useAuth();
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          showNotification: true,
          notificationTitle: "Acceso denegado",
          notificationDescription:
            "Debes iniciar sesión para acceder a esta página",
        }}
      />
    );
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
