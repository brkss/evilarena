import { IRoute } from "../types/Route";
import { Home, Login } from "../../pages";

export const routes: IRoute[] = [
  
  {
    name: "Login",
    exeact: true,
    component: Login,
    path: "/login",
    protected: false,
  },
];

export const protected_routes : IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
    exeact: true,
    protected: true,
  },
]
