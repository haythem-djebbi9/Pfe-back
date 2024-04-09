const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback');

// Route pour ajouter un feedback
router.post('/add', feedbackController.addFeedback);

// Route pour récupérer tous les feedbacks
router.get('/all', feedbackController.getAllFeedbacks);

router.get('/:id', feedbackController.getFeedbackById);

module.exports = router;
