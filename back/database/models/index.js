const mongoose = require('mongoose');
const Service = require('./userModel');
const db = require('../../config/mConfig.json');

const CONFIG = db[process.env.NODE_ENV || "development"];

const url = `mongodb://${CONFIG.host}:${CONFIG.port}/${CONFIG.database}`

mongoose.connect(url)
.catch((err) => {
    console.log('connection failed');
    process.exit(1);
})

module.exports = {
    Service
}