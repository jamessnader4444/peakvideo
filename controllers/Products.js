import Categories from "../models/CategoryModel.js";
import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { getUserInfo } from "./Users.js";
import { Sequelize } from "sequelize";

Categories.hasMany(Products);
Products.belongsTo(Categories);
Users.hasMany(Products);
Products.belongsTo(Users);
const Op = Sequelize.Op;
export const addProduct = async (req, res) => {
  try {
    const { name, userId, description, categoryId, imageURL, videoURL } =
      req.body;

    await Products.create({
      name,
      categoryId,
      userId,
      imageURL,
      videoURL,
      description,
    });
    const result = await getUserInfo(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (req, res) => {
  const { categoryId, start, limit, searchText } = req.body;
  const { rows, count } = await Products.findAndCountAll({
    where: {
      categoryId,
      deletedAt: {
        [Op.eq]: null,
      },
      name: {
        [Op.like]: `%${searchText}%`,
      },
    },
    include: [
      {
        model: Categories,
        as: "category",
        required: false,
        attributes: [],
      },
      {
        model: Users,
        as: "user",
        required: false,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [Sequelize.col("category.name"), "categoryName"],
        [Sequelize.col("user.name"), "username"],
      ],
    },
    offset: start,
    limit,
  });
  const category = await Categories.findByPk(categoryId);
  res.json({
    total: Math.ceil(count / limit),
    data: rows,
    categoryName: category ? category.name : "Peak Video",
  });
};

export const getProductsByUser = async (req, res) => {
  const { userId, start, limit, searchText } = req.body;
  const { rows, count } = await Products.findAndCountAll({
    where: {
      userId,
      deletedAt: {
        [Op.eq]: null,
      },
      name: {
        [Op.like]: `%${searchText}%`,
      },
    },
    attributes: ["id", "name", "userId", "imageURL", "videoURL", "description"],
    offset: start,
    limit,
  });
  const user = await Users.findByPk(userId);
  res.json({
    total: Math.ceil(count / limit),
    data: rows,
    username: user.name,
  });
};
export const getProduct = async (req, res) => {
  const { id } = req.body;
  const product = await Products.findOne({
    where: {
      id,
      deletedAt: {
        [Op.eq]: null,
      },
    },
    include: [
      {
        model: Users,
        as: "user",
        required: false,
        attributes: [],
      },
    ],
    attributes: {
      include: [[Sequelize.col("user.name"), "username"]],
    },
  });
  res.json(product);
};

export const getNextRandomVideo = async (req, res) => {
  const { categoryId, id } = req.body;
  const products = await Products.findAll({
    where: {
      categoryId,
      deletedAt: {
        [Op.eq]: null,
      },
    },
    attributes: ["id"],
  });
  const product_ids = products.map((product) => product.id);
  if (product_ids.length === 1) {
    return res.json(id);
  }
  let random;
  while (1) {
    random = Math.floor(Math.random() * product_ids.length);
    if (product_ids[random] != id) break;
  }
  res.json(product_ids[random]);
};
