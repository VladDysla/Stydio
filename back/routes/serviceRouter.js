const express = require("express");
const serviceRouter = express.Router();
const {
  createService,
  getOneService,
  getManyService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

serviceRouter.post("/", createService);
serviceRouter.get("/:serviceId", getOneService);
serviceRouter.get("/", getManyService);
serviceRouter.put("/:serviceId", updateService);
serviceRouter.delete("/:serviceId", deleteService);


module.exports = serviceRouter;
