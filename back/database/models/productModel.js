const mongoose = require('mongoose')
 const { request } = require('../../app')
 
 const productShema = mongoose.Schema({
     name:{
         type: String,
         required: true
     },
     cost:{
         type: Number,
         required: true
     },
     image:{
         type:String,
     }
 
 })
 
 const Product = mongoose.model('Product', productShema)
 module.exports= Product