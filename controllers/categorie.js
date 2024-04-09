
const categorie = require('../models/categorie');





const create = async (req, res) => {
    try {
      let data = req.body;
      let cat = new categorie(data);
      
      let result = await cat.save();
      res.status(200).send(result);
    }  catch (error) {
      res.status(500).send(error);
   }
  }

  const byid =async (req,res)=>{
    try{
    let id=req.params.id;
    let result=await categorie.findById({_id:id});
    res.status(200).send(result);
    
    }
    catch (error) {
      res.status(500).send(error);
    }
    
    
    
    
    }
    const getall=async (req,res)=>{
    try {
      let result =await categorie.find();
      res.status(200).send(result);
      
    } catch (error) {
      res.status(500).send(error);
    }
    
    
    
    }
    
    
    
    const del=async (req,res)=>{
    try{
    let id=req.params.id;
    let result=await categorie.findByIdAndDelete({_id:id})
    res.status(200).send(result);
    
    
    }
    
    
    catch (error) {
      res.status(500).send(error);
    }
    }
    
    const update = async (req, res) => {
        try {
          let id = req.params.id;
          let data = req.body;
    
    
          let result = await categorie.findByIdAndUpdate({_id:id}, data); // <-- passer les arguments séparément
          res.status(200).send(result);
        } catch (error) {
          res.status(500).send(error);
       }
      }
    module.exports={
    create,
    byid,
    del,
    getall,
    update
    
    }