const express=require('express');
const router = express.Router();
const {registre ,login} = require('../controllers/user');


router.post('/registre',registre);
router.post('/login',login);







module.exports=router;