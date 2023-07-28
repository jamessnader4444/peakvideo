import SiteInfo from "../models/SiteInfoModel.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;
export const getSiteInfo = async (req, res) => {
  try {
    const defaultSiteInfo = {
      topLeftLogo: "logo.svg",
      middleLogo: "back.jpg",
      contact: "",
      company: "",
      bannerLogo: "banner.jpg",
      logoText: "100 videos for 5$",
      bannerEnable: 1,
      phoneNumber: "123 456 789",
      fax: "123 456 789"
    };
    const siteInfo = await SiteInfo.findAll();
    if (siteInfo[0]) res.json(siteInfo[0]);
    else res.json(defaultSiteInfo);
  } catch (error) {
    console.log(error);
  }
};

export const changeTopLeftLogo = async (req, res) => {
  try {
    const { topLeftLogo } = req.body;
    await SiteInfo.update(
      { topLeftLogo },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const changeMiddleLogo = async (req, res) => {
  try {
    const { middleLogo } = req.body;
    await SiteInfo.update(
      { middleLogo },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const changeLogoText = async (req, res) => {
  try {
    const { logoText } = req.body;
    await SiteInfo.update(
      { logoText },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const changeContact = async (req, res) => {
  try {
    const { email, phoneNumber, fax } = req.body;
    console.log(email, phoneNumber, fax);
    await SiteInfo.update(
      { email, phoneNumber, fax },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const changeCompany = async (req, res) => {
  try {
    const { company } = req.body;
    await SiteInfo.update(
      { company },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
export const changeBannerLogo = async (req, res) => {
  try {
    const { bannerLogo } = req.body;
    await SiteInfo.update(
      { bannerLogo },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const changeBannerEnable = async (req, res) => {
  try {
    const { bannerEnable } = req.body;
    await SiteInfo.update(
      { bannerEnable },
      {
        where: { id: 1 },
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
