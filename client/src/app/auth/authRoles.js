/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["admin"],
  staff: ["admin", "user", "staff"],
  user: ["user"],
  onlyGuest: [],
};

export default authRoles;
