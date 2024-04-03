// AppRouter.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../views/Login";
import { DashboardLayout } from "../layouts"; // Ensure the path is correct
import { PrivateRoute } from "./private";
import { useAuth } from "../context";
import { DashboardSection } from "../components";
import { capitalizeFirstLetter } from "../utils/functions";

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const dashboardSubRoutes = ["recipes", "categories", "tags"];

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate replace to="recipes" />} />
          {dashboardSubRoutes.map((route, index) => (
            <Route
              key={index}
              path={route}
              element={
                <DashboardSection title={capitalizeFirstLetter(route)} />
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
