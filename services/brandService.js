const BrandModel = require("../models/brandModel");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require("./handlersFactory");

// @desc   Get brands
// @route  GET /api/v1/brands
// @access Public
exports.getBrands = getAll(BrandModel);

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
