const express = require("express");
 const productRouter = express.Router();
 const {
   createProduct,
   getOneProduct,
   getManyProduct,
   updateProduct,
   deleteProduct,
 } = require("../controllers/productController");
 
 productRouter.post("/", createProduct);
 productRouter.get("/:productId", getOneProduct);
 productRouter.get("/", getManyProduct);
 productRouter.put("/:productId", updateProduct);
 productRouter.delete("/:productId", deleteProduct);

 
 module.exports = productRouter;