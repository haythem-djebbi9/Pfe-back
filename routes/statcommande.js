const express = require('express');
const router = express.Router();
const statCommandeController = require('../controllers/statcommande');


router.post('/calcule', statCommandeController.createStatsFromCommandes)


router.get('/get', statCommandeController.getProduitNoms)
// router.get('/gettop', statCommandeController.getTopSellingProducts)




module.exports = router;
