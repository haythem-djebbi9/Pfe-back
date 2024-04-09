const express = require('express');
const router = express.Router();
const commandecouleur = require('../controllers/commandecouleur');

// Route pour créer une nouvelle commande
router.post('/commandecadd', commandecouleur.createCommande);

router.get('/all', commandecouleur.getAllCommandes);





// Route pour obtenir toutes les commandes d'un utilisateur

module.exports = router;