const { Product, Photo } = require("../database/models");
module.exports.createProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = await Product.create(body);
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
};
module.exports.getOneProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;
    const product = await Product.findById(productId).populate('photos');
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};
module.exports.getManyProduct = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate('photos')
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};
module.exports.updateProduct = async (req, res, next) => {
  try {
    const {
      body,
      params: { productId },
    } = req;
    const product = await Product.findByIdAndUpdate(productId, body);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

module.exports.addPhotoToProduct = async (req, res, next) => {
  try {
      const {params: {photoId, productId}} = req;
      // додати коту інфу про власника
      const photo = await Photo.findOneAndUpdate({_id: photoId}, {product: productId}, {returnDocument: 'after'});
      // додати власнику інфу про кота
      // Крок 1: знайти екземпляр моделі Власника 
      const product = await Product.findById(productId);
      // Крок 2: Запушити до масиву котів catId
      product.photos.push(photoId);
      // Крок 3: викликати метод save() для збереження цих змін у БД
      await product.save()
      res.status(200).send({data: photo}) 
  } catch(error) {
      next(error)
  }
}