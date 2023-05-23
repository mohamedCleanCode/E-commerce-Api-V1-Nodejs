const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const ApiError = require("../utils/ApiError");

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
