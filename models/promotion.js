const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pourcentageReduction: {
    type: Number,
    required: true
  },
  validite: {
    type: Date,
    required: true
  },
  prixInitiaux: {
    type: Map,
    of: Number, // Type de prix initial
    required: true
  }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
