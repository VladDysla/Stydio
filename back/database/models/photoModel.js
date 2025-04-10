const mongoose = require('mongoose')
 const { request } = require('../../app')
 
 const photoShema = mongoose.Schema({
     path:{
         type: String,
         required: true
     },
     product:{
         type: mongoose.SchemaTypes.ObjectId,
         ref:'Product'
     }
 
 })
 
 const Photo = mongoose.model('Photo', photoShema)
 module.exports= Photo