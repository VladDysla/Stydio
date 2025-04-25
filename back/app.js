const express = require('express');
const cors = require('cors'); // Не забудьте установить: npm install cors
const rootRouter = require('./routes/rootRouter');
const app = express();

// Добавляем CORS middleware первым
app.use(cors({
   origin: [
    'http://studiobeauty.com.ua',
    'https://studiobeauty.com.ua',
    'https://www.studiobeauty.com.ua/',
    'http://localhost:3000', // для локальной разработки
    'http://192.168.0.104:3000' // Добавьте ваш IP
   ],
   credentials: true
 }));// Разрешает все CORS-запросы (для разработки)

// Остальные middleware
app.use(express.json()); // bodyParser заменён на встроенный в Express 4.16+
app.use('/api', rootRouter);
app.use('/images', express.static('public/images'))

module.exports = app;