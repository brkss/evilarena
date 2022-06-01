import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/token/token";

export const ProtectLayout: React.FC = () => {
  if (getToken() === "") return <Navigate to={"/login"} />;

  return <Outlet />;
};
