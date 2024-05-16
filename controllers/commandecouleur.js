const CommandeCouleur = require('../models/commandecouleur');
const User = require('../models/userr');
const Couleur = require('../models/couleur');
const nodemailer = require('nodemailer');

// Fonction pour créer une nouvelle commande de couleur pour un utilisateur donné
exports.createCommande = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur, les détails de la commande et la quantité
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

        // Calculer le prix en fonction de la quantité
        const prix = 16 * quantite;

        // Créer une nouvelle commande de couleur avec les détails
        const newCommande = new CommandeCouleur({
            user: userId,
            couleur: couleurId,
            quantite: quantite,
            prix: prix
        });

        // Enregistrer la commande dans la base de données
        await newCommande.save();

        // Envoyer un e-mail de confirmation pour la commande
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'djebbihaitem9@gmail.com',
                pass: 'qumr rooj igto tlaq'
            }
        });
        const mailOptions = {
            from: 'djebbihaitem9@gmail.com',
            to: user.email,
            subject: 'Confirmation de commande',
            text: `Votre commande est confirmée. Dans 48 heures, votre commande sera ${couleur.codec}`
        };
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Commande créée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
                id:couleur._id,
                user: user.name,
                prenom:user.prenom,
                emailUser: user.email,
                usertel: user.telephone,
                useraddresse: user.adresse,
                couleur: couleur.codec,
                quantite: commande.quantite,
                prix: commande.prix,
                date: commande.date,
                datelivraison: commande.dateLivraison
            });
        }

        // Retourner les détails des commandes sous forme de réponse JSON
        res.status(200).json(commandesDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commandes." });
    }
};

// Fonction pour afficher l'historique des commandes d'un utilisateur spécifique
exports.getUserCommandes = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de requête
        const userId = req.params.userId;

        // Récupérer toutes les commandes de l'utilisateur spécifié
        const commandes = await CommandeCouleur.find({ user: userId });

        // Retourner les commandes de l'utilisateur sous forme de réponse JSON
        res.status(200).json(commandes);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'historique des commandes." });
    }
};

// Fonction pour annuler une commande de couleur
exports.annulerCommande = async (req, res) => {
    try {
        // Récupérer l'ID de la commande à annuler à partir des paramètres de requête
        const commandeId = req.params.commandeId;

        // Vérifier si la commande existe dans la base de données
        const commande = await CommandeCouleur.findById(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable." });
        }

        // Vérifier si la commande peut être annulée (par exemple, si elle a été passée il y a moins de 2 heures)
        const deuxHeuresAvant = new Date();
        deuxHeuresAvant.setHours(deuxHeuresAvant.getHours() - 2);
        if (commande.date <= deuxHeuresAvant) {
            return res.status(400).json({ message: "Impossible d'annuler cette commande car elle a été passée il y a plus de 2 heures." });
        }

        // Supprimer la commande de la base de données
        await CommandeCouleur.findByIdAndDelete(commandeId);

        res.status(200).json({ message: "Commande annulée avec succès." });
    } catch (error) {
        console.error('Erreur lors de l\'annulation de la commande :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'annulation de la commande." });
    }

};
exports.livreCommande = async (req, res) => {
    try {
        const commandeId = req.params.commandeId;

        // Vérifier si la commande existe
        const commande = await CommandeCouleur.findById(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable." });
        }

        // Marquer la commande comme livrée et enregistrer la date de livraison
        commande.livree = true;
        commande.dateLivraison = new Date(); // Utiliser la date actuelle comme date de livraison
        await commande.save();

        res.status(200).json({ message: "Commande marquée comme livrée avec succès." });
    } catch (error) {
        console.error('Erreur lors du marquage de la commande comme livrée :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors du marquage de la commande comme livrée." });
    }
}