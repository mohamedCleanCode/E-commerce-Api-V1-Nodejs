const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Category must be unique"],
      minLength: [3, "Too short category name"],
      maxLength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowerCase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create Model
const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
