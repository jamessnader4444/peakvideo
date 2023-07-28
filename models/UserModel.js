import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    roleId: {
      field: "role_id",
      type: DataTypes.INTEGER,
    },
    coinbaseAccount: {
      field: "coinbase_account",
      type: DataTypes.STRING,
    },
    paypalAccount: {
      field: "paypal_account",
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

export default Users;
