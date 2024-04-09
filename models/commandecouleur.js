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
    }   
});

module.exports = mongoose.model('CommandeCouleur', CommandeCouleurSchema);
