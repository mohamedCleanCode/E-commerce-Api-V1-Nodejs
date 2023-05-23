const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ProductModel = require("../models/productModel");
const ApiFeatures = require("../utils/ApiFeatures");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
} = require("./handlersFactory");

// @desc   Get products
// @route  GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  const documentsCount = await ProductModel.countDocuments();
  // Build query
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search("Product")
    .fields()
    .sort();

  // Execute Query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

// @desc   Create product
// @route  POST /api/v1/products
// @access Private
exports.createProduct = createOne(ProductModel);

// @desc   Get specific product by id
// @route  GET /api/v1/products/:id
// @access Public
exports.getProduct = getOne(ProductModel);

// @desc   Update product
// @route  PUT /api/v1/products/:id
// @access Private
exports.updateProduct = updateOne(ProductModel);

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = deleteOne(ProductModel);
