
const mongoose = require('mongoose');
let objectId = require('mongodb').ObjectId;

const livreur=mongoose.model('livreur',{
name:{
    type :String,
    required:true,
},
prenom:{
    type :String,
    required:true,
   
},
adresse:{
    type :String,
    required:true,
   
},
telephone:{
    type :Number,
    required:true,
   
},

email:{
    type :String,
    required:true,
   
},

password:{
    type :String,
    required:true,
   


}


















})
module.exports=livreur;