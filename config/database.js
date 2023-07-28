import { Sequelize } from "sequelize";

const db = new Sequelize("cms", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
