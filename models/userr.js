
const mongoose = require('mongoose');
let objectId = require('mongodb').ObjectId;

const user=mongoose.model('user',{
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

aime:{
    type: Boolean,
    default:false
}


















})
module.exports=user;