const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// Route pour l'inscription d'un nouvel administrateur
router.post('/register', adminController.register);

// Route pour la connexion d'un administrateur
router.post('/login', adminController.login);

// Route pour supprimer un administrateur spécifique
router.delete('/admin/:adminId', adminController.deleteAdmin);

// Route pour afficher tous les administrateurs
router.get('/admins', adminController.getAllAdmins);

module.exports = router;