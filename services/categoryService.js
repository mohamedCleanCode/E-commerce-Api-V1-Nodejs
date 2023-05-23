const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
} = require("./handlersFactory");

// @desc   Get categories
// @route  GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const documentsCount = await CategoryModel.countDocuments();
  // Build query
  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .fields()
    .sort();

  // Execute Query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const caegories = await mongooseQuery;
  res
    .status(200)
    .json({ results: caegories.length, paginationResult, data: caegories });
});

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
