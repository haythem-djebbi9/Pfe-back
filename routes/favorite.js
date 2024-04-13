const express = require ('express');
const router = express.Router();
const Favorite = require('../models/favorite');

// Add a product to favorites

router.post('/addToFavoris', async(req, res)=> {
    try {
        const{idProd} = req.body;
        const existingFavorite = await Favorite.findOne({idProd});
        if (existingFavorite) {
            return res.status(400).json({ message: 'Product already in favorites'});
        }
        const favorite = new Favorite({idProd});
        await favorite.save();
        res.status(201).json({message:'Product added to favorites successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal vserver error'});
    }
});

//Remove a product from favorites

router.delete('/removeFromFavoris', async(req, res) =>{
    try {
        const{idProd} = req.body;
        const deleteFavorite = await Favorite.findOneAndDelete({idProd});
        if(!deleteFavorite) {
            return res.status(404).json({message: 'Product not found in favorites' })
        }
        res.json({message: 'Product removed from favorites successfuly'});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
});
module.exports = router;