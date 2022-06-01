import React from "react";
import { getToken } from "../utils/token/token";
import { Navigate } from "react-router-dom";
import { IRoute } from "../utils/types/Route";

interface Props {
  route: IRoute;
}

export const AuthGuard: React.FC<Props> = ({ route }) => {
  if (route.protected && getToken() === "") <Navigate replace to={"/login"} />;

  return <h1>Hello</h1>;
};
