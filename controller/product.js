require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const log = require("log4js").getLogger("product");
log.level = "info";
const scrapPublisher = require("../publisher/scrap");
const consumePublisher = require("../consumer/scrap");

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
  const result = await scrapPublisher({
    url: "https://randomuser.me/api/",
  });
  log.debug("result", result);
  res
    .status(201)
    .json({ success: true, message: "Scrapper Queue Started...." });
});

// * @route POST /api/v1/products/consumes
// @desc    consume scrap products
// @access  Private
exports.consumeProducts = asyncHandler(async (req, res, next) => {
  const result = await consumePublisher();
  log.debug("result", result);
  res
    .status(201)
    .json({ success: true, message: "Success consume the publisher..." });
});
