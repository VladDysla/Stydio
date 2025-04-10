const express = require("express");
 const photoRouter = express.Router();
 const upload = require('../middlewares/multer')
 const {
   createPhoto,
   getOnePhoto,
   getManyPhoto,
   deletePhoto,
   updatePhoto
 } = require("../controllers/photoController");
 
 photoRouter.post("/", upload.single('image'), createPhoto);
 photoRouter.get("/:photoId", getOnePhoto);
 photoRouter.get("/", getManyPhoto);
 photoRouter.delete("/:photoId", deletePhoto);
 photoRouter.put("/:photoId", updatePhoto);
 
 module.exports = photoRouter