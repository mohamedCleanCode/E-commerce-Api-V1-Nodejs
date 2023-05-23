const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

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

// @desc   Get specific category by id
// @route  GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No category with this ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc   Create category
// @route  POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc   Update category
// @route  PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`No category with this ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc   Delete category
// @route  DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No category with this ${id}`, 404));
  }
  res.status(204).send();
});
