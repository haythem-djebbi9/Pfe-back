const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommandeSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    produits: [{
        produit: {
            type: ObjectId,
            ref: 'Produit'
        },
        quantite: {
            type: Number,
            default: 1 
        }
    }],
    quantitec: {
        type: Number,
    },
    total: {
        type: Number,
        default: 0 // Définir une valeur par défaut pour éviter NaN
    },
    totalad: {
        type: Number,
        default: 0 // Définir une valeur par défaut pour éviter NaN
    },
    date: {
        type: Date,
        default: Date.now
    },
    nbCommande : {
        type:Number,
        default: 0
    },
    nbCommandePr : {
        type:Number,
        default: 0
    },
    livree : {
        type: Boolean,
        default : false
    },
    dateLivraison: {
        type: Date, // Champ pour stocker la date de livraison
        default: null // La date de livraison est nulle par défaut, car la commande n'a pas été livrée
    }
});

module.exports = mongoose.model('Commande', CommandeSchema);
