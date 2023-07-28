import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const SiteInfo = db.define(
  "site_info",
  {
    topLeftLogo: {
      field: "top_left_logo",
      type: DataTypes.STRING,
    },
    middleLogo: {
      field: "middle_logo",
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      field: "phone_number",
      type: DataTypes.STRING,
    },
    fax: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    bannerLogo: {
      field: "banner_logo",
      type: DataTypes.STRING,
    },
    bannerEnable: {
      field: "banner_enable",
      type: DataTypes.STRING,
    },

    logoText: {
      field: "logo_text",
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "site_info",
    freezeTableName: true,
  }
);

export default SiteInfo;
