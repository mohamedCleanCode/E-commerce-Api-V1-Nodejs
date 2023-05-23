const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
} = require("./handlersFactory");

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
  res.status(200).json({
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

// @desc   Create subCategory
// @route  POST api/v1/subcategories
// @access Private
exports.createSubCategory = createOne(SubCategoryModel);

// @desc   Get specific subCategory
// @route  GET api/v1/subcategories/:id
// @access Public
exports.getSubCategory = getOne(SubCategoryModel);

// @desc   Update specific subCategory
// @route  PUT api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = updateOne(SubCategoryModel);

// @desc   Delete specific subCategory
// @route  DELETE api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = deleteOne(SubCategoryModel);
