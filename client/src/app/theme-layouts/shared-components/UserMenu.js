import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { selectUser } from "app/store/userSlice";

function UserMenu(props) {
  const user = useSelector(selectUser);

  return (
    <>
      {!user.role || user.role.length === 0 ? (
        <>
          <MenuItem component={Link} to="/sign-in" role="button">
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={NavLink} to="/sign-out">
            <ListItemIcon className="min-w-40">
              <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </MenuItem>
        </>
      )}
    </>
  );
}

export default UserMenu;
