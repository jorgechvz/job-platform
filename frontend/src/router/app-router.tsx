import { Route, Routes } from "react-router-dom";
import { AppRoutes, AuhtRoutes } from "./app-routes";
import ProtectedRoute from "./protected-route/protected-route";

export const AppRouter = () => {
  return (
    <Routes>
      {AuhtRoutes.map((route, index) => (
        <Route
          key={`auth-route-${index}`}
          path={route.path}
          element={route.element}
        />
      ))}
      {AppRoutes.map((route, index) => (
        <Route
          key={`app-route-${index}`}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        ></Route>
      ))}
    </Routes>
  );
};
