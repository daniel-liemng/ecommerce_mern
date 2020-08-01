const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const router = require("../routes/category");

// categoryById Middleware
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    req.category = category;
    next();
  });
};

// Get a category
exports.read = (req, res) => {
  return res.json(req.category);
};

// Create a new category
exports.create = (req, res) => {
  const category = new Category(req.body);

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json({ data });
  });
};
