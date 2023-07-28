import { Sequelize } from "sequelize";

const db = new Sequelize(
  "heroku_d8665f1f40c1bb2",
  "b56562578eae2d",
  "1404ba06",
  {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
  }
);

export default db;
