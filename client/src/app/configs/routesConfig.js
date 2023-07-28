import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404PageConfig from "../main/404/Error404PageConfig";
import HomeConfig from "../main/HomeConfig";
import ProductsConfig from "../main/products/ProductsConfig";
import AdminConfig from "../main/dashboards/admin/AdminConfig";
import UserConfig from "../main/dashboards/user/UserConfig";
import { authRoles } from "../auth";
import ProductConfig from "../main/products/ProductConfig";

const routeConfigs = [
  HomeConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ProductsConfig,
  ProductConfig,
  AdminConfig,
  UserConfig,
  Error404PageConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, authRoles.admin),
  // {
  //   path: "/",
  //   element: <Navigate to="/home" />,
  //   auth: null,
  // },

  {
    path: "loading",
    element: <FuseLoading />,
    auth: null,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
