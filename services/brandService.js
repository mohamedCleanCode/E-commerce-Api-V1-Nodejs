const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const BrandModel = require("../models/brandModel");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
} = require("./handlersFactory");

// @desc   Get brands
// @route  GET /api/v1/brands
// @access Public
exports.getBrands = asyncHandler(async (req, res) => {
  const documentsCount = await BrandModel.countDocuments();
  // Build query
  const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .fields()
    .sort();

  // Execute Query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

// @desc   Create brand
// @route  POST /api/v1/brands
// @access Private
exports.createBrand = createOne(BrandModel);

// @desc   Get specific brand by id
// @route  GET /api/v1/brands/:id
// @access Public
exports.getBrand = getOne(BrandModel);

// @desc   Update brand
// @route  PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = updateOne(BrandModel);

// @desc   Delete brand
// @route  DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = deleteOne(BrandModel);
