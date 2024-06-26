
const Produit = require('../models/produit');
const User = require('../models/userr');
const Admin = require('../models/admin');
const Commande = require('../models/commande');

const nodemailer = require('nodemailer'); // Importer nodemailer
const admin = require('../models/admin');

exports.passCommande = async (req, res) => {
    try {
        const { userId, produits } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        let total = 0;

        for (const item of produits) {
            const produit = await Produit.findById(item.produit);
            if (!produit) {
                return res.status(404).json({ message: "Produit introuvable." });
            }

            if (produit.quantite < item.quantite) {
                return res.status(400).json({ message: `Quantité insuffisante pour le produit ${produit.name}.` });
            }

            total += item.quantite * produit.prix;
            produit.quantite -= item.quantite;
            await produit.save();
        }

        if (total > 100) {
            total = total * 0.85;
        }

        const newCommande = new Commande({
            user: userId,
            produits: produits,
            quantitec: produits.length,
            total: total
        });

        await newCommande.save();

        const users = await User.find({}, 'email');
        const admins = await Admin.find({}, 'email');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'djebbihaitem9@gmail.com',
              pass: 'qumr rooj igto tlaq'
            }
        });

        for (const user of users) {
            const mailOptions = {
                from: 'djebbihaitem9@gmail.com',
                to: user.email,
                subject: 'confirmation de commande',
                text: `votre commande est confirmée, dans 48 heures votre commande sera reçue, le total de votre commande est : ${total}`
            };
            await transporter.sendMail(mailOptions);
        }

        const produitsFaibles = await Produit.find({ quantite: { $lte: 10 } });
        for (const produit of produitsFaibles) {
            for (const user of admins) {
                const mailOptions = {
                    from: 'djebbihaitem9@gmail.com',
                    to: user.email,
                    subject: 'Alerte : Quantité de produit faible',
                    text: `La quantité du produit "${produit.name}" est faible (${produit.quantite}). Veuillez revoir le stock.`
                };
                await transporter.sendMail(mailOptions);
            }
        }

        res.status(201).json(newCommande);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la commande." });
    }
};


exports.getAllCommandes = async (req, res) => {
    try {
        // Récupérer toutes les commandes de la base de données
        const commandes = await Commande.find();

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

            // Récupérer les détails des produits commandés
            const produitsDetails = [];
            for (const produit of commande.produits) {
                const produitInfo = await Produit.findById(produit.produit);
                if (!produitInfo) {
                    console.log('Produit introuvable pour la commande avec ID :', commande._id);
                    continue; // Passer au produit suivant
                }
                produitsDetails.push({
                    nomProduit: produitInfo.name,
                    quantite: produit.quantite
                });
            }

            // Ajouter les détails de la commande dans le tableau
            commandesDetails.push({
                id: commande._id,
                user: user.name,
                prenom:user.prenom,
                emailUser: user.email,
                usertel: user.telephone,
                useraddresse: user.adresse,
                produits: produitsDetails,
                total: commande.total,
                livree: commande.livree,
                date: commande.date,
                dateLivraison: commande.dateLivraison,
                accepte:commande.accepte
               

                
            });
        }

        // Retourner les détails des commandes sous forme de réponse JSON
        res.status(200).json(commandesDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commandes." });
    }



};

exports.getcommandebyuser = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir de la requête
        const { userId } = req.params;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        // Récupérer toutes les commandes de l'utilisateur spécifié
        const commandes = await Commande.find({ user: userId });

        // Tableau pour stocker les détails des commandes de l'utilisateur
        const commandesDetails = [];

        // Parcourir chaque commande pour récupérer les détails
        for (const commande of commandes) {
            const produitsDetails = await Promise.all(commande.produits.map(async (produit) => {
                // Récupérer les détails des produits commandés
                const produitInfo = await Produit.findById(produit.produit);
                if (!produitInfo) {
                    console.log('Produit introuvable pour la commande avec ID :', commande._id);
                    return null; // Ignorer ce produit
                }
                return {
                    nomProduit: produitInfo.name,
                    quantite: produit.quantite
                };
            }));

            // Filtrer les produits détaillés (pour ignorer les produits introuvables)
            const filteredProduitsDetails = produitsDetails.filter(produit => produit !== null);

            // Ajouter les détails de la commande dans le tableau
            commandesDetails.push({
                id: commande._id,

                produits: filteredProduitsDetails,
                quantitec: commande.quantitec,
                total: commande.total,
                Date: commande.date,
                dateLivraison : commande.dateLivraison,
                accepte:commande.accepte,
                livree: commande.livree,


                // Date: commande.dateCommande // Cette ligne est commentée car la date de commande n'est pas renvoyée
            });
        }

        // Retourner les détails des commandes de l'utilisateur sous forme de réponse JSON
        res.status(200).json(commandesDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes de l\'utilisateur :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des commandes de l'utilisateur." });
    }
};


exports.annulerCommande = async (req, res) => {
    try {
        // Récupérer l'ID de la commande à annuler depuis les paramètres de la requête
        const commandeId = req.params.commandeId;

        // Vérifier si la commande existe
        const commande = await Commande.findById(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable." });
        }

        // Vérifier si la commande peut être annulée dans les 24 heures
        const maintenant = new Date();
        const differenceTemps = maintenant.getTime() - commande.date.getTime();
        const differenceHeures = Math.ceil(differenceTemps / (1000 * 60 * 60)); // Convertir la différence de temps en heures

        if (differenceHeures > 24) {
            return res.status(400).json({ message: "La commande ne peut être annulée que dans les 24 heures suivant la commande." });
        }

        // Supprimer la commande de la base de données
        await Commande.findByIdAndDelete(commandeId);

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
        const commande = await Commande.findById(commandeId);
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
};
exports.accepterCommande = async (req, res) => {
    try {
        const commandeId = req.params.commandeId;

        // Vérifier si la commande existe
        const commande = await Commande.findById(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande introuvable." });
        }

        // Marquer la commande comme acceptée
        commande.accepte = true;
        await commande.save();

        res.status(200).json({ message: "Commande acceptée avec succès." });
    } catch (error) {
        console.error('Erreur lors de l\'acceptation de la commande :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'acceptation de la commande." });
    }
};