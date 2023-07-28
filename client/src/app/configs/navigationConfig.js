import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import authRoles from "../auth/authRoles";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "admin",
    title: "Admin",
    subtitle: "Admin Page",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "ADMIN",
    auth: authRoles.admin,
    children: [
      {
        id: "admin_users",
        title: "Users",
        type: "item",
        translate: "USERS",
        icon: "heroicons-outline:users",
        url: "/admin/users",
      },
      {
        id: "admin_categories",
        title: "Categories",
        translate: "CATEGORIES",
        type: "item",
        icon: "material-outline:category",
        url: "/admin/categories",
      },
      {
        id: "admin_site_info",
        title: "Site Information",
        translate: "SITE_INFORMATION",
        type: "item",
        icon: "heroicons-outline:information-circle",
        url: "/admin/site_info",
      },
    ],
  },
  {
    id: "user",
    title: "User",
    subtitle: "User Page",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "USER",
    auth: authRoles.user,
    children: [
      {
        id: "user_profile",
        title: "Profile",
        translate: "USER_PROFILE",
        type: "item",
        icon: "material-outline:admin_panel_settings",
        url: "/user/profile",
      },
      {
        id: "user_add_product",
        translate: "ADD_PRODUCT",
        title: "Add Product",
        type: "item",
        icon: "material-outline:add_a_photo",
        url: "/user/add_product",
      },
    ],
  },
];

export default navigationConfig;
