import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "./utils/config/routes";

export const Application: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, key) => (
          <Route
            path={route.path}
            element={<route.component name={route.name} {...route.props} />}
          />
        ))}
      </Routes>
    </Router>
  );
};
