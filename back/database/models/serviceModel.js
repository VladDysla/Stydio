const mongoose = require('mongoose')
const { request } = require('../../app')

const serviceShema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    cost:{
        type: Number,
        required: true
    }

})

const Service = mongoose.model('Service', serviceShema)
module.exports= Service