const mongoose = require('mongoose');
const Favorite = mongoose.model('Favorite',{
    idProd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produit',
        required: true
    }
});
module.exports = Favorite;