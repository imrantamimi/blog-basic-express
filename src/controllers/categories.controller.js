const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../models/categories.model");
const { getPagination } = require("../utils/query");

async function httpGetAllCategories(req, res) {
  const { skip, limit } = getPagination(req.query);
  const categories = await getAllCategories(skip, limit);
  return res.status(200).json(categories);
}

async function httpGetCategoryById(req, res) {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  return res.status(200).json(category);
}

async function httpCreateCategory(req, res) {
  const data = req.body;
  const category = await createCategory(data);
  return res.status(200).json(category);
}

async function httpUpdateCategory(req, res) {
  const categoryId = req.params.id;
  const data = req.body;
  const category = await updateCategory(id, data);
  return res.status(200).json(category);
}

async function httpDeleteCategory(req, res) {
  const categoryId = req.params.id;
  await deleteCategory(categoryId);
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllCategories,
  httpGetCategoryById,
  httpCreateCategory,
  httpUpdateCategory,
  httpDeleteCategory,
};
