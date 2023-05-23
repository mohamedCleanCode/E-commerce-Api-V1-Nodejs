const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

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

// @desc   Set categoryId to body of req
// @route  POST /api/v1/categories/:categoryId/subcategories
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc   Get subCategories
// @route  GET api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const documentsCount = await SubCategoryModel.countDocuments();
  // Build query
  const apiFeatures = new ApiFeatures(SubCategoryModel.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .fields()
    .sort();

  // Execute Query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery;
  res
    .status(200)
    .json({
      data: subCategories,
      paginationResult,
      result: subCategories.length,
    });
});

// @desc   Set filterObj to body of req
// @route  GET /api/v1/categories/:categoryId/subcategories
exports.setFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.body.filterObject = filterObject;
  next();
};

// @desc   Get specific subCategory
// @route  GET api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id);
  // .populate({path: "category",select: "name",});
  if (!subCategory) {
    return next(new ApiError(`No subCategory with this ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc   Update specific subCategory
// @route  PUT api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true }
  );
  if (!subCategory) {
    next(new ApiError(`No subCategory with this ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc   Delete specific subCategory
// @route  DELETE api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory with this ${id}`, 404));
  }
  res.status(204).send();
});
