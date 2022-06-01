import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../../utils/token/token";

export const AuthLayout: React.FC = () => {
  if (getToken() !== '' ) return <Navigate to={"/"} />;

  return <Outlet />;
};
