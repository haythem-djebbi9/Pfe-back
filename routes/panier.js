const express = require('express');
const router = express.Router();
const { ajouterProduit, afficherProduitsPanier, supprimerProduit } = require('../controllers/panier');

router.post('/create', ajouterProduit);

// La route pour afficher les produits du panier doit être configurée comme suit
router.get('/all/:userId', afficherProduitsPanier);

// Ajoutez :produitId pour permettre la transmission de l'ID du produit à supprimer
router.delete('/supprimer/:userId/:produitId', supprimerProduit);



module.exports = router;

