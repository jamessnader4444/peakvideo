import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
    },
    categoryId: {
      field: "category_id",
      type: DataTypes.INTEGER,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
    },
    videoURL: {
      field: "video_url",
      type: DataTypes.STRING,
    },
    imageURL: {
      field: "image_url",
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
    deletedAt: {
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Products;
