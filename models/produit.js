const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    idCat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie', // Assurez-vous que c'est le bon nom de modèle pour la catégorie
        required: true,
    },
  
});

module.exports = mongoose.model('Produit', produitSchema); // Correction pour nommer le modèle "Produit"
