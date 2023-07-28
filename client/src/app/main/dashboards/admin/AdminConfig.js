import authRoles from "../../../auth/authRoles";
import Categories from "./Categories";
import Users from "./Users";
import SiteInfo from "./SiteInfo";

const AdminConfig = {
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
  auth: authRoles.admin,
  routes: [
    {
      path: "/admin/categories",
      element: <Categories />,
    },
    {
      path: "/admin/users",
      element: <Users />,
    },
    {
      path: "/admin/site_info",
      element: <SiteInfo />,
    },
  ],
};

export default AdminConfig;
