require("pretty-error").start();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3131;
const morgan = require("morgan");
const productRoutes = require("./route/product");
const log4js = require("log4js");
const log = log4js.getLogger("entrypoint");
log.level = "info";

// * Parsing
app.use(express.json());

// * Http Logger
app.use(morgan("dev"));

// * Routing
app.use(productRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome To Rabbit API",
  });
});

app.get("*", function (req, res) {
  res.status(404).json({ success: false, message: "Nothing In this Route..." });
});

// * Server Listen
app.listen(PORT, (err) => {
  if (err) {
    log.error(`Error : ${err}`);
    process.exit(1);
  }
  log.info(`Server is Running On Port : ${PORT}`);
});
