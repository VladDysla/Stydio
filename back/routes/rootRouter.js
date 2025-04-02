const express = require("express");
const rootRouter = express.Router();
const serviceRouter = require("./serviceRouter");
const productRouter = require('./productRouter');

rootRouter.use("/beauty", serviceRouter);
rootRouter.use("/product", productRouter);

module.exports = rootRouter;
