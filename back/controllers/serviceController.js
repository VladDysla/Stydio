const {Service} = require('../database/models')
module.exports.createService = async (req,res,next)=>{
    try{
        const{body} = req
        const service = await Service.create(body)
        res.status(201).send(service)
    }catch(err){
        next(err)
    }
}
module.exports.getOneService = async (req,res,next)=>{
    try{
        const{params:{serviceId}} = req
        const service = await Service.findById(serviceId)
        res.status(200).send(service)
    }catch(err){
        next(err)
    }
}
module.exports.getManyService = async (req,res,next)=>{
    try{
        const services = await Service.find({})
        res.status(200).send(services)
    }catch(err){
        next(err)
    }
}
module.exports.updateService = async (req,res,next)=>{
    try{
        const{body,params:{serviceId}} = req
        const service = await Service.findByIdAndUpdate(serviceId, body)
        res.status(200).send(service)
    }catch(err){
        next(err)
    }
}
module.exports.deleteService = async (req,res,next)=>{
    try{
        const{params:{serviceId}} = req
        const service = await Service.findByIdAndDelete(serviceId)
        res.status(200).send(service)
    }catch(err){
        next(err)
    }
}