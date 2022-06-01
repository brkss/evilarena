import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { routes, protected_routes } from "./utils/config/routes";
import { ProtectLayout, AuthLayout } from "./component";

export const Application: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectLayout />}>
          {protected_routes.map((route, key) => (
            <Route key={key} path={route.path} element={<route.component />} />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {routes.map((route, key) => (
            <Route key={key} path={route.path} element={<route.component />} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};
