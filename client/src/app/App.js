// import "@mock-api";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import settingsConfig from "app/configs/settingsConfig";
import axios from "axios";
import withAppProviders from "./withAppProviders";
import { AuthProvider } from "./auth/AuthContext";
import FuseAuthorization from "@fuse/core/FuseAuthorization/FuseAuthorization";
import history from "@history";
import { useEffect, useState, createContext, useContext } from "react";

export const SiteInfoContext = createContext();
/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";

if (module?.hot?.status() === "apply") {
  const { pathname } = history.location;
  history.push("/loading");
  history.push({ pathname });
}

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

const App = () => {
  const [siteInfo, setSiteInfo] = useState(null);
  const fetchSiteInformation = async () => {
    const res = await axios.post("api/site_info");
    setSiteInfo(res.data);
  };

  useEffect(() => {
    fetchSiteInformation();
  }, []);

  const updateSiteInfo = (siteInfo) => {
    setSiteInfo(siteInfo);
  };
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <SiteInfoContext.Provider value={{ siteInfo, updateSiteInfo }}>
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <AuthProvider>
            <BrowserRouter>
              <FuseAuthorization
                userRole={user.role}
                loginRedirectUrl={settingsConfig.loginRedirectUrl}
              >
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  classes={{
                    containerRoot:
                      "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                  }}
                >
                  <FuseLayout layouts={themeLayouts} />
                </SnackbarProvider>
              </FuseAuthorization>
            </BrowserRouter>
          </AuthProvider>
        </FuseTheme>
      </SiteInfoContext.Provider>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
