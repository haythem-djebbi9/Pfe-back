const express = require('express');



const router = express.Router();


const {create,getall,byid,del,update}=require('../controllers/categorie');        
 router.post('/create',create);
 router.get('/getall',getall);
 router.get('/byid/:id',byid);
 router.delete('/del/:id',del);
 router.put('/update/:id',update);

 module.exports=router;

