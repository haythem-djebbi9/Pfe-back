const feedback = require('../models/feedback');
const Feedback = require('../models/feedback');
const User = require('../models/userr');

// Méthode pour ajouter un feedback
exports.addFeedback = async (req, res) => {
    try {
        const { userId, feedbackText } = req.body;

        // Créer une instance de feedback
        const newFeedback = new Feedback({
            user: userId,
            feedback: feedbackText
        });





        // Enregistrer le feedback dans la base de données
        const feedback = await newFeedback.save();

        res.status(201).json({ message: 'Feedback ajouté avec succès', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du feedback." });
    }
};

// Méthode pour récupérer tous les feedbacks
exports.getAllFeedbacks = async (req, res) => {
    try {
        // Récupérer tous les feedbacks de la base de données
        const feedbacks = await Feedback.find();

        // Tableau pour stocker les détails des feedbacks
        const feedbacksDetails = [];

        // Parcourir chaque feedback pour récupérer les détails
        for (const feedback of feedbacks) {
            // Récupérer le nom de l'utilisateur associé au feedback
            const user = await User.findById(feedback.user);

            // Vérifier si l'utilisateur existe
            if (!user) {
                console.log('Utilisateur introuvable pour le feedback avec ID :', feedback._id);
                continue; // Passer au feedback suivant
            }

            // Ajouter les détails du feedback dans le tableau
            feedbacksDetails.push({
                user: {
                    name: user.name,
                    prenom: user.prenom,
                    telephone: user.telephone,

                   
                },
                feedbackText: feedback.feedback
            });
        }

        // Retourner les détails des feedbacks sous forme de réponse JSON
        res.status(200).json(feedbacksDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des feedbacks :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des feedbacks." });
    }
};

// Méthode pour récupérer un feedback par son ID

 exports.getFeedbackById =async (req,res)=>{
    try{
    let id=req.params.id;
    let result=await feedback.findById({_id:id});

    
    res.status(200).send(result);
    
    }
    catch (error) {
      res.status(500).send(error);
    }
    
};
