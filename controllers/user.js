const  Admin=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registre=async(req,res)=>{
try {
  let admin=new Admin(req.body);


admin.password=bcrypt.hashSync(req.body.password,10);


  let result=await admin.save();
  res.status(200).send(result);


} catch (error) {
   res.status(500).send(error);
}



}

const login=async(req,res)=>{

    try {

let {email,password}=req.body;
let result =await Admin.findOne({email:email})
if (!result) {
    res.status(401).send('email invalid')
} 

let valid=bcrypt.compareSync(password,result.password);

if (!valid) {
    res.status(401).send('password invalid');


} 
    
let payload={
_id:result._id,
name:result.name,
prenom:result.prenom,
telephone:result.telephone,

email:result.email,

}

let token=jwt.sign(payload,'123456789');
res.status(200).send({mytoken:token})






    





    
    } catch (error) {
        res.status(500).send(error);
     }
    



}

module.exports={
registre,
login

}

