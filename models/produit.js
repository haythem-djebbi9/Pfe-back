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
        type: mongoose.Types.ObjectId, // Utilisation de mongoose.Types.ObjectId
        required: true,
    },
    favoir: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Produit', produitSchema); // Correction pour nommer le modèle "Produit"
