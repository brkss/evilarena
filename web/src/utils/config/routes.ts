import { IRoute } from "../types/Route";
import { Home, Login, Channel } from "../../pages";

export const routes: IRoute[] = [
  {
    name: "Login",
    exeact: true,
    component: Login,
    path: "/login",
    protected: false,
  },
];

export const protected_routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
    exeact: true,
    protected: true,
  },
  {
    name: "Channels",
    path: "/channel/:id",
    component: Channel,
    exeact: true,
    protected: true,
  },
];
