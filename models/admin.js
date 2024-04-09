const mongoose = require('mongoose');
let objectId = require('mongodb').ObjectId;

const admin=mongoose.model('admin',{
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
   


},

poste: {
type : String,


}


















})
module.exports=admin;