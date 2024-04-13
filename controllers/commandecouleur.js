const CommandeCouleur = require('../models/commandecouleur');
const User = require('../models/userr');

const Couleur = require('../models/couleur');

const nodemailer = require('nodemailer');

// Contrôleur pour créer une nouvelle commande de couleur pour un utilisateur donné
exports.createCommande = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur et les détails de la commande
        const { userId, couleurId, quantite } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        // Vérifier si la couleur existe
        const couleur = await Couleur.findById(couleurId);
        if (!couleur) {
            return res.status(404).json({ message: "Couleur introuvable." });
        }

        // Créer une nouvelle commande de couleur avec les détails
        const newCommande = new CommandeCouleur({
            user: userId,
            couleur: couleurId,
            quantite: quantite
        });

        // Enregistrer la commande dans la base de données
        await newCommande.save();

        // Envoyer un e-mail de confirmation pour la commande
        const users = await User.find({}, 'email'); // Déplacer la récupération des utilisateurs ici
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'djebbihaitem9@gmail.com',
              pass: 'qumr rooj igto tlaq'
            }
        });
      
        // Envoyer la promotion à chaque utilisateur
        for (const user of users) {
            const mailOptions = {
                from: 'djebbihaitem9@gmail.com',
                to: user.email,
                subject: 'confirmation de commande',
                text: `votre commande est confirmée, dans 48 heures votre commande sera  ${couleur.codec}`
            };
            await transporter.sendMail(mailOptions);
        }
       

        res.status(201).json({ message: 'Commande créée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour afficher toutes les commandes de couleur
// Fonction pour afficher toutes les commandes de couleur
exports.getAllCommandes = async (req, res) => {
    try {
        // Récupérer toutes les commandes de la base de données
        const commandes = await CommandeCouleur.find();

        // Tableau pour stocker les détails des commandes
        const commandesDetails = [];

        // Parcourir chaque commande pour récupérer les détails
        for (const commande of commandes) {
            // Récupérer le nom de l'utilisateur associé à la commande
            const user = await User.findById(commande.user);

            // Vérifier si l'utilisateur existe
            if (!user) {
                console.log('Utilisateur introuvable pour la commande avec ID :', commande._id);
                continue; // Passer à la commande suivante
            }

            // Récupérer les détails de la couleur commandée
            const couleur = await Couleur.findById(commande.couleur);

            // Vérifier si la couleur existe
            if (!couleur) {
                console.log('Couleur introuvable pour la commande avec ID :', commande._id);
                continue; // Passer à la commande suivante
            }

            // Ajouter les détails de la commande dans le tableau
            commandesDetails.push({
                user: user.name,
                emailUser: user.email,
                usertel: user.telephone,
                useraddresse: user.adresse,
                couleur: couleur.codec,
                quantite: commande.quantite
            });
        }

        // Retourner les détails des commandes sous forme de réponse JSON
        res.status(200).json(commandesDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commandes." });
    }
};

// };
// exports.historique = async (req, res) => {
//     try {
//         // Récupérer l'ID de l'utilisateur à partir de la demande
//         const userId = req.params.userId;

//         // Rechercher toutes les commandes de cet utilisateur dans la base de données
//         const commandes = await CommandeCouleur.find({ user: userId });

//         // Tableau pour stocker les détails de l'historique des commandes
//         const historiqueCommandes = [];

//         // Parcourir chaque commande trouvée
//         for (const commande of commandes) {
//             // Récupérer les détails de l'utilisateur associé à la commande
//             const user = await User.findById(commande.user);

//             // Récupérer les détails de la couleur commandée
//             const couleur = await Couleur.findById(commande.couleur);

//             // Vérifier si l'utilisateur et la couleur existent
//             if (!user || !couleur) {
//                 console.log('Commande invalide avec ID :', commande._id);
//                 continue; // Passer à la commande suivante
//             }

//             // Ajouter les détails de la commande dans le tableau de l'historique des commandes
//             historiqueCommandes.push({
//                 commandeId: commande._id,
//                 user: {
//                     name: user.name,
//                     email: user.email,
//                     telephone: user.telephone,
//                     adresse: user.adresse
//                 },
//                 couleur: {
//                     id: couleur._id,
//                     codec: couleur.codec,
//                     // Autres détails de la couleur selon les besoins
//                 },
//                 quantite: commande.quantite,
//                 // Autres détails de la commande selon les besoins
//             });
//         }

//         // Retourner l'historique des commandes sous forme de réponse JSON
//         res.status(200).json(historiqueCommandes);
//     } catch (error) {
//         console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
//         res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'historique des commandes." });
//     }
// };
