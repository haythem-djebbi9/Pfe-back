const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panier');

router.post('/ajouterProduit', panierController.ajouterProduit);
router.delete('/supprimer/:userId/:produitId', panierController.supprimerProduit);
router.get('/isProduitDansPanier/:userId/:produitId', panierController.isProduitDansPanier);

module.exports = router;
