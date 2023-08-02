import {
  Button,
  CircularProgress,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { SiteInfoContext } from "src/app/App";
import clsx from "clsx";
import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function SiteInfo() {
  const { updateSiteInfo, siteInfo } = useContext(SiteInfoContext);

  const [tlLogoUploading, setTlLogoUploading] = useState(false);
  const [mlLogoUploading, setMlLogoUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);

  const [topLeftLogo, setTopLeftLogo] = useState();
  const [middleLogo, setMiddleLogo] = useState();
  const [bannerLogo, setBannerLogo] = useState();
  const [bannerEnable, setBannerEnable] = useState(siteInfo.bannerEnable);
  const [logoText, setLogoText] = useState();
  const [company, setCompany] = useState();
  const [contact, setContact] = useState({
    email: "",
    phoneNumber: "",
    fax: "",
  });
  const handleChangeTopLeftLogo = async (e) => {
    e.preventDefault();
    setTlLogoUploading(true);
    const formData = new FormData();
    formData.append("file", topLeftLogo);
    let res = await axios.post("api/uploads/file", formData);
    const url = res.data.filename;
    res = await axios.post("api/site_info/changeTopLeftLogo", {
      topLeftLogo: url,
    });
    if (res.data.success) updateSiteInfo({ ...siteInfo, topLeftLogo: url });
    setTlLogoUploading(false);
  };
  const handleChangeMiddleLogo = async (e) => {
    e.preventDefault();
    setMlLogoUploading(true);
    const formData = new FormData();
    formData.append("file", middleLogo);
    let res = await axios.post("api/uploads/file", formData);
    const url = res.data.filename;
    console.log(url);
    res = await axios.post("api/site_info/changeMiddleLogo", {
      middleLogo: url,
    });
    if (res.data.success) updateSiteInfo({ ...siteInfo, middleLogo: url });
    setMlLogoUploading(false);
  };
  const handleChangeCompany = async (e) => {
    e.preventDefault();
    const res = await axios.post("api/site_info/changeCompany", {
      company,
    });
    if (res.data.success) updateSiteInfo({ ...siteInfo, company });
    setCompany("");
  };
  const handleChangeContact = async (e) => {
    e.preventDefault();
    const res = await axios.post("api/site_info/changeContact", contact);
    if (res.data.success)
      updateSiteInfo({
        ...siteInfo,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        fax: contact.fax,
      });
    setContact({ email: "", phoneNumber: "", fax: "" });
  };
  const handleChangeLogoText = async (e) => {
    e.preventDefault();
    const res = await axios.post("api/site_info/changeLogoText", {
      logoText,
    });
    if (res.data.success) updateSiteInfo({ ...siteInfo, logoText });
    setLogoText("");
  };
  const handleChangeBannerLogo = async (e) => {
    e.preventDefault();
    setBannerUploading(true);
    const formData = new FormData();
    formData.append("file", bannerLogo);
    let res = await axios.post("api/uploads/file", formData);
    const url = res.data.filename;
    res = await axios.post("api/site_info/changeBannerLogo", {
      bannerLogo: url,
    });
    if (res.data.success) updateSiteInfo({ ...siteInfo, bannerLogo: url });
    setBannerUploading(false);
  };
  const handleChangeBannerEnable = async (e) => {
    setBannerEnable(e.target.checked);

    const res = await axios.post("api/site_info/changeBannerEnable", {
      bannerEnable: e.target.checked,
    });
    if (res.data.success) {
      updateSiteInfo({ ...siteInfo, bannerEnable: e.target.checked });
    }
  };
  return (
    <FusePageSimple
      header={
        <div className="mt-20 flex justify-center items-center text-[40px]">
          Site Information
        </div>
      }
      content={
        <div className="p-20 w-full">
          <div className="mt-48 mb-16 flex">
            <form onSubmit={handleChangeTopLeftLogo}>
              <Typography className="mb-24 font-medium text-24">
                Top Left Logo:
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setTopLeftLogo(e.target.files[0])}
                required
              />
              <Button
                className="my-10"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<UploadIcon />}
              >
                {tlLogoUploading ? (
                  <CircularProgress className="p-4" color="secondary" />
                ) : (
                  "Upload"
                )}
              </Button>
            </form>
          </div>
          <img
            className="w-40 h-40"
            src={`${process.env.REACT_APP_UPLOAD_URL}/${siteInfo.topLeftLogo}`}
            alt="logo"
          />
          <div className="mt-48 mb-16 flex">
            <form onSubmit={handleChangeMiddleLogo}>
              <Typography className="mb-24 font-medium text-24">
                Middle Logo:
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMiddleLogo(e.target.files[0])}
                required
              />
              <Button
                className="my-10"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<UploadIcon />}
              >
                {mlLogoUploading ? (
                  <CircularProgress className="p-4" color="secondary" />
                ) : (
                  "Upload"
                )}
              </Button>
            </form>
          </div>
          <img
            className="w-256 h-128 ml-60"
            src={`${process.env.REACT_APP_UPLOAD_URL}/${siteInfo.middleLogo}`}
            alt="logo"
          />
          <div className="mt-48 mb-16">
            <form onSubmit={handleChangeContact}>
              <Typography className="mb-24 font-medium text-24">
                Contact:
              </Typography>
              <Typography className="my-12 font-medium text-14">
                Email:
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                fullWidth
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
              <div className="flex flex-col">
                <div>
                  <Typography className="my-12 font-medium text-14">
                    Phone Number:
                  </Typography>
                  <PhoneInput
                    country={"us"}
                    inputProps={{
                      name: "phone",
                      required: true,
                    }}
                    value={contact.phoneNumber}
                    onChange={(val, country, e, formattedVal) =>
                      setContact({ ...contact, phoneNumber: formattedVal })
                    }
                  />
                </div>
                <div>
                  <Typography className="my-12 font-medium text-14">
                    Fax:
                  </Typography>
                  <PhoneInput
                    country={"us"}
                    inputProps={{
                      name: "fax",
                      required: true,
                    }}
                    value={contact.fax}
                    onChange={(val, country, e, formattedVal) =>
                      setContact({ ...contact, fax: formattedVal })
                    }
                  />
                </div>
              </div>
              <Button
                className="mt-12"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Change
              </Button>
            </form>
          </div>
          <div className="mt-48 mb-16">
            <form onSubmit={handleChangeCompany}>
              <Typography className="mb-24 font-medium text-24">
                Company:
              </Typography>
              <TextField
                label="Company"
                variant="outlined"
                required
                value={company}
                fullWidth
                onChange={(e) => setCompany(e.target.value)}
              />
              <Button
                className="mt-12"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Change
              </Button>
            </form>
          </div>
          <div className="mt-48 mb-16 flex">
            <form onSubmit={handleChangeBannerLogo}>
              <Typography className="mb-24 font-medium text-24">
                Ads Banner:
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerLogo(e.target.files[0])}
                required
              />
              <Button
                className="my-10"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<UploadIcon />}
              >
                {bannerUploading ? (
                  <CircularProgress className="p-4" color="secondary" />
                ) : (
                  "Upload"
                )}
              </Button>
            </form>
          </div>
          <div className="mb-16">
            <div className="flex items-center">
              <Typography
                className={clsx(
                  "font-medium text-20 ",
                  bannerEnable ? "text-green" : "text-red"
                )}
              >
                {bannerEnable ? "Locked" : "Unlocked"}
              </Typography>
              <Switch
                checked={bannerEnable ? true : false}
                onChange={handleChangeBannerEnable}
              />
            </div>
            {bannerEnable == 1 && (
              <img
                className="w-256 h-128 ml-60 mt-10"
                src={`${process.env.REACT_APP_UPLOAD_URL}/${siteInfo.bannerLogo}`}
                alt="logo"
              />
            )}
          </div>
          <div className="mt-48 mb-16">
            <form onSubmit={handleChangeLogoText}>
              <Typography className="mb-24 font-medium text-24">
                Logo Text:
              </Typography>
              <TextField
                label="Logo Text"
                variant="outlined"
                required
                value={logoText}
                inputProps={{ minLength: 10 }}
                onChange={(e) => setLogoText(e.target.value)}
                multiline
                rows={3}
                fullWidth
              />
              <Button
                className="mt-12"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Change
              </Button>
            </form>
          </div>
        </div>
      }
    ></FusePageSimple>
  );
}
