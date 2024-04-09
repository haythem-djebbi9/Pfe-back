const express = require('express');



const router = express.Router();


const {sendPromotionEmails}=require('../controllers/promotion');        
 router.post('/create',sendPromotionEmails);


 module.exports=router;

