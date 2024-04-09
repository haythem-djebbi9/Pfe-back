const mongoose = require('mongoose');
let objectId = require('mongodb').ObjectId;

const couleur=mongoose.model('couleur',{
codec:{
    type :String,
    required:true,
},

image:{
    type :String,
    required:true,
   


},



















})
module.exports=couleur;