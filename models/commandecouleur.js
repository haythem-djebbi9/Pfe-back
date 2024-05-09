const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommandeCouleurSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    couleur: {
        type: ObjectId,
        ref: 'Couleur'
    },
    quantite: {
        type: Number,
        default: 1 
    } , 
    prix : {
        type : Number,
    }  ,
    date: {
        type: Date,
        default: Date.now
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

module.exports = mongoose.model('CommandeCouleur', CommandeCouleurSchema);
