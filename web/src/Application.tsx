import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { routes, protected_routes } from "./utils/config/routes";
import { ProtectLayout, AuthLayout, Loading } from "./component";
import { URL } from "./utils/config/default";
import { setToken } from "./utils/token/token";

export const Application: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    //setLoading(true);
    fetch(`${URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      if (data.status) {
        console.log("setup token");
        setToken(data.token);
      }
        setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

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
