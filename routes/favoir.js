const express = require('express');
const router = express.Router();
const favoirController = require('../controllers/favoir');

router.post('/ajouterProduit', favoirController.ajouterProduit);
router.delete('/supprimer/:userId/:produitId', favoirController.supprimerProduit);

module.exports = router;
