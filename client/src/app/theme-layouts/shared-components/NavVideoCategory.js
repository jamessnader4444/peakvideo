import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

export default function MenuPopupState() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const response = await axios.post("api/categories/all");
    setCategories(response.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Stack direction="row" spacing={2}>
      <Button component={Link} to="/video_category/Peak Video/-1">
        Peak Video
      </Button>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Category
              <FuseSvgIcon className="text-48" size={24} color="action">
                heroicons-outline:chevron-down
              </FuseSvgIcon>
            </Button>
            <Menu {...bindMenu(popupState)}>
              {categories.length === 0 ? (
                <MenuItem onClick={popupState.close}>No Categories...</MenuItem>
              ) : (
                categories?.map((category) => (
                  <MenuItem
                    key={category.id}
                    to={`/video_category/${category.name}/${category.id}`}
                    onClick={popupState.close}
                    component={Link}
                  >
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Menu>
          </Fragment>
        )}
      </PopupState>
    </Stack>
  );
}
