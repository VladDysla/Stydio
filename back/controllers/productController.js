const { Product } = require("../database/models");
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
    const product = await Product.findById(productId);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};
module.exports.getManyProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});
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
