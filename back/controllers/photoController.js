const {Product, Photo} = require('../database/models')
 module.exports.createPhoto = async (req,res,next)=>{
     try{
         console.log('b');
         const{body:{productId}, file:filename} = req
         console.log('t');
         console.log(filename);
         const photo = await Photo.create({path:filename.path, product:productId})
         res.status(201).send(photo)
     }catch(err){
         next(err)
     }
 }
 module.exports.getOnePhoto = async (req,res,next)=>{
     try{
         const{params:{photoId}} = req
         const photo = await Photo.findById(photoId).populate('product')
         res.status(200).send(photo)
     }catch(err){
         next(err)
     }
 }
 module.exports.getManyPhoto = async (req,res,next)=>{
     try{
         const photos = await Photo.find({}).populate('product')
         res.status(200).send(photos)
     }catch(err){
         next(err)
     }
 }
 module.exports.deletePhoto = async (req,res,next)=>{
     try{
         const{params:{photoId}} = req
         const photo = await Photo.findByIdAndDelete(photoId)
         res.status(200).send(photo)
     }catch(err){
         next(err)
     }
 }

 module.exports.updatePhoto = async (req,res,next)=>{
    try{
        const{body,params:{photoId}} = req
        const photo = await Photo.findByIdAndUpdate(photoId, body)
        res.status(200).send(photo)
    }catch(err){
        next(err)
    }
}