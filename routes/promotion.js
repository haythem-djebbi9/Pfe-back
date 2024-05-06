const express = require('express');



const router = express.Router();


const {sendPromotionEmails , getall}=require('../controllers/promotion');        
 router.post('/create',sendPromotionEmails);
 router.get('/getall',getall);

 getall


 module.exports=router;

