const express = require("express");
const rootRouter = express.Router();
const serviceRouter = require("./serviceRouter");

rootRouter.use("/beauty", serviceRouter);

module.exports = rootRouter;
