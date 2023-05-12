const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");

// @desc   Create subCategory
// @route  POST api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc   Get subCategories
// @route  GET api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 50;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategoryModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ data: subCategories });
});

// @desc   Get specific subCategory
// @route  GET api/v1/subcategories
// @access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory with this ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
