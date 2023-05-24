const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Model.findByIdAndDelete(id);
    if (!product) {
      return next(new ApiError(`No product with this ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const subCategory = await Model.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!subCategory) {
      next(new ApiError(`No subCategory with this ${req.params.id}`, 404));
    }
    res.status(200).json({ data: subCategory });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await Model.findById(id);
    // .populate({path: "category",select: "name",});
    if (!subCategory) {
      return next(new ApiError(`No subCategory with this ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const subCategory = await Model.create(req.body);
    res.status(201).json({ data: subCategory });
  });

exports.getAll = (Model, modelName) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.body.filterObject) {
      filter = req.body.filterObject;
    }
    const documentsCount = await Model.countDocuments();
    // Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCount)
      .filter()
      .search(modelName)
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
