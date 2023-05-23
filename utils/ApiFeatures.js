class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  // 1) Filteration
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "limit", "sort", "fields", "keyword"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    // {price: {gte: "50"}, ratingsAverage: {gte: "4"}}
    let queryStr = JSON.stringify(queryStringObj);
    // {price: {$gte: "50"}, ratingsAverage: {$gte: "4"}}
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    // .where("price")
    // .equals(req.query.price)
    // .where("ratingsAverage")
    // .equals(req.query.ratingsAverage)

    // Build query
    this.mongooseQuery = this.mongooseQuery.find(queryStr);

    return this;
  }

  // 2) Sorting
  sort() {
    if (this.queryString.sort) {
      const sosrtBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sosrtBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("createdAt");
    }
    return this;
  }

  // 3) Fields limiting
  fields() {
    if (this.queryString.fields) {
      const limitBy = this.queryString.fields.split(",").join(" ");
      console.log(limitBy);
      this.mongooseQuery = this.mongooseQuery.select(limitBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  // 4) Search
  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Product") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  // 5) Pagination
  paginate(documentsCount) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // Pagination Result
    const pagination = {};
    pagination.limit = limit;
    pagination.currentPage = page;
    pagination.numbersOfPages = Math.ceil(documentsCount / limit);
    if (endIndex < documentsCount) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.previus = page - 1;
    }
    this.paginationResult = pagination;
    // Build query
    this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
