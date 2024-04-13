const express = require('express');
const router = express.Router();
const livreurController = require('../controllers/livreur');

// Route pour l'inscription d'un nouvel administrateur
router.post('/register', livreurController.registre);

// Route pour la connexion d'un administrateur
router.post('/login', livreurController.login);

// Route pour supprimer un administrateur spécifique
router.delete('/livreur/:livreurId', livreurController.deleteLivreur);

// Route pour afficher tous les administrateurs
router.get('/livreurs', livreurController.getAllLivreur);

module.exports = router;