import Categories from "../models/CategoryModel.js";
import { Sequelize } from "sequelize";
import sequelize from "sequelize";
const Op = Sequelize.Op;

export const getCategories = async (req, res) => {
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
    const { rows, count } = await Categories.findAndCountAll({
      where: {
        [Op.and]: filterQuery,
        deletedAt: {
          [Op.eq]: null,
        },
      },
      attributes: ["id", "name"],
      offset: start,
      limit: size,
      order: sortQuery,
    });
    res.json({ total: count, data: rows });
  } catch (error) {
    console.log(error);
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["id", "name"],
      where: {
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await Categories.update(
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

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await Categories.create({ name });
    res.json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    await Categories.update(
      { name },
      {
        where: { id },
      }
    );
    res.json({ succes: true });
  } catch (error) {
    console.log(error);
  }
};
