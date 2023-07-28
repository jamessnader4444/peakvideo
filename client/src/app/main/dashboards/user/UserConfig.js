import authRoles from "../../../auth/authRoles";
import Profile from "./Profile";
import AddProduct from "./AddProduct";

const UserConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: true,
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
  auth: authRoles.user,
  routes: [
    {
      path: "/user/add_product",
      element: <AddProduct />,
    },
    {
      path: "/user/profile",
      element: <Profile />,
    },
  ],
};

export default UserConfig;
