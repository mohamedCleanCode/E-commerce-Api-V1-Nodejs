const CategoryModel = require("../models/categoryModel");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require("./handlersFactory");

// @desc   Get categories
// @route  GET /api/v1/categories
// @access Public
exports.getCategories = getAll(CategoryModel);

// @desc   Create category
// @route  POST /api/v1/categories
// @access Private
exports.createCategory = createOne(CategoryModel);

// @desc   Get specific category by id
// @route  GET /api/v1/categories/:id
// @access Public
exports.getCategory = getOne(CategoryModel);

// @desc   Update category
// @route  PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = updateOne(CategoryModel);

// @desc   Delete category
// @route  DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = deleteOne(CategoryModel);
