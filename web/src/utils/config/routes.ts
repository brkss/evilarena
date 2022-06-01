import { IRoute } from '../types/Route';
import { Home } from '../../pages';

export const routes : IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
    exeact: true,
  },

]
