const mongoose = require("mongoose");
const Service = require("./serviceModel");
const Product = require('./productModel');
const Photo = require('./photoModel');

// Ваш рядок підключення з Atlas (замініть на свій)
const ATLAS_CONNECTION_STRING = "mongodb+srv://nasonov117:Monoligh12345@beauty.gfstfwq.mongodb.net/?retryWrites=true&w=majority&appName=beauty";

const connectDB = async () => {
  try {
    await mongoose.connect(ATLAS_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ Підключено до MongoDB Atlas');
  } catch (err) {
    console.error('❌ Помилка підключення до Atlas:', err.message);
    process.exit(1);
  }
};

// Експортуємо моделі та функцію підключення
module.exports = {
  connectDB,
  Service,
  Product,
  Photo
};