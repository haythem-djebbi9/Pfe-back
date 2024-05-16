const express = require('express');
const router = express.Router();
const commandecouleur = require('../controllers/commandecouleur');

// Route pour créer une nouvelle commande
router.post('/commandecadd', commandecouleur.createCommande);

router.get('/all', commandecouleur.getAllCommandes);


// Route pour afficher l'historique des commandes d'un utilisateur spécifique
router.get('/commandes/:userId', commandecouleur.getUserCommandes);

// Route pour annuler une commande spécifique
router.delete('/commande/:commandeId', commandecouleur.annulerCommande);




// Route pour obtenir toutes les commandes d'un utilisateur

module.exports = router;