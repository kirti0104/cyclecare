import express, { Router } from "express";
import authRouter from "./authRoute";
import cycleRouter from "./cycleRoutes";

interface Route {
  path: string;
  route: Router;
}

const allRoutes = express.Router();

const defaultRoutes: Route[] = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/cycle",
    route: cycleRouter,
  }


];

defaultRoutes.forEach((route) => {
  allRoutes.use(route.path, route.route);
});

export default allRoutes;
