const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const favoirSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    produits: [{
        produit: {
            type: ObjectId,
            ref: 'Produit'
        }
    }]
});

const Favoir = mongoose.model('Favoir', favoirSchema);

module.exports = Favoir;
