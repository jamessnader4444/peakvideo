import { memo, useContext } from "react";
import { SiteInfoContext } from "src/app/App";

function AdsBanner(props) {
  const { siteInfo } = useContext(SiteInfoContext);
  return (
    <div className="bg-blue-500 text-white text-center">
      <img
        className="w-full h-[100px]"
        src={`${process.env.REACT_APP_UPLOAD_URL}/${siteInfo.bannerLogo}`}
        alt="banner"
      />
    </div>
  );
}

export default memo(AdsBanner);
