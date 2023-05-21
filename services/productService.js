const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const ApiError = require("../utils/ApiError");

// @desc   Get products
// @route  GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filteration
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "limit", "sort", "fields"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  // {price: {gte: "50"}, ratingsAverage: {gte: "4"}}
  let queryStr = JSON.stringify(queryStringObj);
  // {price: {$gte: "50"}, ratingsAverage: {$gte: "4"}}
  queryStr = JSON.parse(
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  );

  // 2) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // Build query
  let mongooseQuery = ProductModel.find(queryStr)
    // .where("price")
    // .equals(req.query.price)
    // .where("ratingsAverage")
    // .equals(req.query.ratingsAverage)
    .limit(limit)
    .skip(skip)
    .populate({
      path: "category",
      select: "name",
    });

  // 3) Sorting
  if (req.query.sort) {
    const sosrtBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sosrtBy);
  } else {
    mongooseQuery = mongooseQuery.sort("createdAt");
  }

  // 4) Fields limiting
  if (req.query.fields) {
    const limitBy = req.query.fields.split(",").join(" ");
    console.log(limitBy);
    mongooseQuery = mongooseQuery.select(limitBy);
  } else {
    mongooseQuery = mongooseQuery.select("-__v");
  }

  // Execute Query
  const products = await mongooseQuery;
  res.status(200).json({ results: products.length, page, data: products });
});

// @desc   Get specific product by id
// @route  GET /api/v1/products/:id
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!product) {
    return next(new ApiError(`No product with this ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc   Create product
// @route  POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc   Update product
// @route  PUT /api/v1/products/:id
// @access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product with this ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product with this ${id}`, 404));
  }
  res.status(204).send();
});
