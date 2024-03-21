const express = require('express');



const router = express.Router();

  const {createCouleur,getall,getCouleurById,deleteCouleur,updateCouleur} =require('../controllers/couleur');
 

// multer config

const multer=require('multer');

let filename='';
const mystorage=multer.diskStorage({
destination:'./uploads',
filename:(req,file,redirect)=>{

filename=Date.now()+'.'+file.mimetype.split('/')[1];
redirect(null,filename);
}

}) 
const upload=multer ({storage:mystorage})



router.post('/create',  upload.any('image'),(req,res)=>{

    createCouleur(req,res,filename);
    filename='';
}

)
router.get('/all', getall)


router.get('/getbyid/:id', getCouleurById)





router.put('/update/:id', upload.any('image'), (req, res) => {
    updateCouleur(req, res, filename);
});

//delete employee
router.delete('/supprimer/:id', deleteCouleur);










module.exports=router;