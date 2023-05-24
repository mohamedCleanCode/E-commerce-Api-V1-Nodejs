const SubCategoryModel = require("../models/subCategoryModel");
const {
  deleteOne,
  updateOne,
  getOne,
  createOne,
  getAll,
} = require("./handlersFactory");

// @desc   Set categoryId to body of req
// @route  POST /api/v1/categories/:categoryId/subcategories
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

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

// @desc   Get subCategories
// @route  GET api/v1/subcategories
// @access Public
exports.getSubCategories = getAll(SubCategoryModel);

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
