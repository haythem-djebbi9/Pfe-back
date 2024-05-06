const express=require('express');
const router = express.Router();
const {registre ,login,getUserById} = require('../controllers/user');


router.post('/registre',registre);
router.post('/login',login);

router.get('/getUserById/:id',getUserById);







module.exports=router;