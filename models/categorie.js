const mongoose = require('mongoose');
const categorie=mongoose.model('categorie',{
name:{
    type :String,
    required:true,
},
description:{
    type :String,
    required:true,
   
}



})
module.exports=categorie;