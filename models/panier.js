const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Panier = new Schema({
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
      
    }],
  
});

module.exports = mongoose.model('Panier', Panier);
