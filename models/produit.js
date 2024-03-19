const mongoose = require('mongoose');
let objectId = require('mongodb').ObjectId;

const produit=mongoose.model('produit',{
name:{
    type :String,
    required:true,
},
description:{
    type :String,
    required:true,
   
},
prix:{
    type :Number,
    required:true,
   
},

quantite:{
    type :Number,
    required:true,
   
},

image:{
    type :String,
    required:true,
   


},
idCat:
{   
    type:objectId , 
},

favoir:
{   
    type:Boolean , 
    default:false   // par defaut il est faux
},














})
module.exports=produit;