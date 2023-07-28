import { authRoles } from "src/app/auth";
import Error404Page from "./Error404Page";

const Error404PageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: null,
  routes: [
    {
      path: "404",
      element: <Error404Page />,
    },
  ],
};

export default Error404PageConfig;
