require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const axios = require("axios").default;
const log = require("log4js").getLogger("product");
log.level = "info";

// * Dummy Db
var db = [];

// * @route GET /api/v1/products
// @desc    Get all post
// @access  Private
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    totalData: db.length,
    data: db,
  });
});

// * @route POST /api/v1/products
// @desc    scrap products
// @access  Private
exports.scrapProducts = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .json({ success: true, message: "Scrapper Queue Started...." });
});
