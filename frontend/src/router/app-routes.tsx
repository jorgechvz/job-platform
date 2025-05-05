import { type RouteObject } from "react-router-dom";
import { Paths } from "./path.routes";
import LoginPage from "@/pages/auth/login/page";
import CompaniesPage from "@/pages/dashboard/admin/CompaniesPage";
import JobOffersPage from "@/pages/dashboard/admin/JobOffersPage";

export const AppRoutes: RouteObject[] = [
  {
    path: Paths.app.DASHBOARD,
    element: <CompaniesPage />,
  },
  {
    path: Paths.app.JOB_OFFERS,
    element: <JobOffersPage />,
  }
];

export const AuhtRoutes: RouteObject[] = [
  { path: Paths.auth.LOGIN, element: <LoginPage /> },
];
