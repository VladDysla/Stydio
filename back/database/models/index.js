const mongoose = require("mongoose");
const Service = require("./serviceModel");
const Product = require('./productModel');
const Photo = require('./photoModel');
const db = require("../../config/mConfig.json");

// Берем конфиг для текущего окружения (development/production)
const CONFIG = db[process.env.NODE_ENV || "development"];

// Если в конфиге есть поле 'url' (например, для MongoDB Atlas), используем его
const url = CONFIG.url;

// Подключение к MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
});

module.exports = {
  Service,
  Product,
  Photo
};
