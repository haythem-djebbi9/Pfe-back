
const mongoose = require('mongoose');

const statCommandeSchema = new mongoose.Schema({
    nombreProduitsCommandes: {
        type: Map,
        of: Number,
        required: true
    },
    avisClient: {
        type: Number,
        required: true
    },
    produitplusvendus: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produit'
        }
    ],

    Date : {
        type: Date,
        default: Date.now
         
    }
});

module.exports = mongoose.model('StatCommande', statCommandeSchema);

