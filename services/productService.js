const ProductModel = require("../models/productModel");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require("./handlersFactory");

// @desc   Get products
// @route  GET /api/v1/products
// @access Public
exports.getProducts = getAll(ProductModel, "Product");

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
