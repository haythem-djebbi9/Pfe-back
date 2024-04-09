const express = require('express');



const router = express.Router();

  const {createProduit,getAllProduit,getProduitById,getProduitByCat,deleteProduit,updateProduit} =require('../controllers/produit');
 
  const {addToFavorites,removeFromFavorites} =require('../controllers/favoir');

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

    createProduit(req,res,filename);
    filename='';
}

)
router.get('/all', getAllProduit)


router.get('/getbyid/:id', getProduitById)


router.get('/getbycat/:id', getProduitByCat)


router.put('/update/:id', upload.any('image'), (req, res) => {
    updateProduit(req, res, filename);
});

//delete employee
router.delete('/supprimer/:id', deleteProduit);








module.exports=router;