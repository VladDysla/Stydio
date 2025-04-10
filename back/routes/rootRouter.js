const express = require("express");
const rootRouter = express.Router();
const serviceRouter = require("./serviceRouter");
const productRouter = require('./productRouter');
const photoRouter = require('./photoRouter')

rootRouter.use("/beauty", serviceRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/image", photoRouter)

module.exports = rootRouter;
