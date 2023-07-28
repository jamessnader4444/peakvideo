import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Categories = db.define(
  "categories",
  {
    name: {
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

export default Categories;
