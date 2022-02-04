const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.get("/api/v1/products", productController.getProducts);

router.post("/api/v1/products/publish", productController.scrapProducts);

router.post("/api/v1/products/consume", productController.consumeProducts);

module.exports = router;
