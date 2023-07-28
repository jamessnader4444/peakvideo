import Users from "../models/UserModel.js";
import Products from "../models/ProductModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import sequelize from "sequelize";

const Op = Sequelize.Op;
Users.hasMany(Products);
Products.belongsTo(Users);
export const getUsers = async (req, res) => {
  try {
    const { start, size, sorting, filters } = req.body;
    let filterQuery = [];

    filters.map((field) =>
      filterQuery.push({
        [field.id]: {
          [Op.like]: `%${field.value}%`,
        },
      })
    );
    let sortQuery = [];

    sorting.map((field) =>
      sortQuery.push([field.id, field.desc ? "desc" : "asc"])
    );
    const { rows, count } = await Users.findAndCountAll({
      where: {
        [Op.and]: filterQuery,
        deletedAt: {
          [Op.eq]: null,
        },
        roleId: 0,
      },
      include: [
        {
          model: Products,
          attributes: [],
        },
      ],
      attributes: {
        exclude: ["password", "roleId"],
        include: [
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM products where products.user_id=users.id AND products.deleted_at IS NULL)"
            ),
            "productNumber",
          ],
        ],
      },
      offset: start,
      limit: size,
      order: sortQuery,
    });
    res.json({ total: count, data: rows });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await Users.update(
      { deletedAt: sequelize.literal("CURRENT_TIMESTAMP") },
      {
        where: { id },
      }
    );
    res.json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};
export const Register = async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const users = await Users.findAll({
      where: {
        email: req.body.email,
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });

    if (users[0])
      return res.json({
        error: [{ type: "email", message: "Email already in use." }],
      });

    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    const result = await getUserInfo(user.id);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { remember, email, password } = req.body;
    const user = await Users.findAll({
      where: {
        email,
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });

    if (!user[0])
      return res.status(200).json({
        error: [{ type: "email", message: "Check your email address." }],
      });
    const match = await bcrypt.compare(password, user[0].password);
    if (!match)
      return res.status(200).json({
        error: [{ type: "password", message: "Check your password." }],
      });
    const result = await getUserInfo(user[0].id);
    let rememberMeToken;
    if (remember)
      rememberMeToken = jwt.sign(
        { email, password },
        process.env.REMEMBER_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
    console.log(rememberMeToken);
    res.json({ ...result, rememberMeToken });
  } catch (error) {
    console.log(error);
  }
};
export const AccessWithToken = async (req, res) => {
  try {
    const { access_token } = req.body;

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    const result = await getUserInfo(decoded.id);

    res.json(result);
  } catch (error) {
    console.error(error);
    // return res.status(401).json({ message: "Unauthorized" });
  }
};
export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const { id } = user[0];
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const changePassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await Users.update(
      { password: hashPassword },
      {
        where: { id },
      }
    );
    res.json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { id, email } = req.body;
    await Users.update(
      { email },
      {
        where: { id },
      }
    );
    const result = await getUserInfo(id);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
export const changePayment = async (req, res) => {
  try {
    const { id, coinbaseAccount, paypalAccount } = req.body;
    await Users.update(
      { coinbaseAccount, paypalAccount },
      {
        where: { id },
      }
    );
    const result = await getUserInfo(id);

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
export const getUserInfo = async (userId) => {
  const user = await Users.findByPk(userId);
  const productNumber = await Products.count({
    where: {
      userId,
      deletedAt: {
        [Op.eq]: null,
      },
    },
  });

  if (!user) return null;
  const { id, name, email, roleId, coinbaseAccount, paypalAccount } = user;
  const access_token = jwt.sign(
    { id, name, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return {
    user: {
      role: roleId === 1 ? "admin" : "user",
      loginRedirectUrl: roleId === 1 ? "/admin/users" : "/user/profile",
      data: {
        id,
        name,
        productNumber,
        email,
        coinbaseAccount,
        paypalAccount,
        // photoURL: "assets/images/avatars/brian-hughes.jpg",
      },
    },
    access_token,
  };
};
