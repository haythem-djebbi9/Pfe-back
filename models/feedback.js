const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assurez-vous que cette référence correspond au modèle User
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
