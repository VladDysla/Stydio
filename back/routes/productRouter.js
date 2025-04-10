const express = require("express");
 const productRouter = express.Router();
 const upload = require('../middlewares/multer.js')
 const {
   createProduct,
   getOneProduct,
   getManyProduct,
   updateProduct,
   deleteProduct,
   addPhotoToProduct
 } = require("../controllers/productController");
 
 productRouter.post("/", createProduct);
 productRouter.get("/:productId", getOneProduct);
 productRouter.get("/", getManyProduct);
 productRouter.put("/:productId", updateProduct);
 productRouter.delete("/:productId", deleteProduct);
 productRouter.patch("/:photoId/:productId",upload.single('path'), addPhotoToProduct);
 
 module.exports = productRouter;