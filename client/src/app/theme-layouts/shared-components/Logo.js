import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SiteInfoContext } from "src/app/App";

const Root = styled("div")(({ theme }) => ({
  "& > .logo-icon": {
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "& > .badge": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));
function Logo() {
  const { siteInfo } = useContext(SiteInfoContext);
  return (
    <Root className="flex items-center">
      <Link to="/" role="button">
        {siteInfo && (
          <img
            src={`${process.env.REACT_APP_UPLOAD_URL}/${siteInfo?.topLeftLogo}`}
            className="logo-icon w-32 h-32"
            alt="logo"
          />
        )}
      </Link>
    </Root>
  );
}

export default Logo;
