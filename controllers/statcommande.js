const StatCommande = require('../models/statcommande');
const Commande = require('../models/commande');
const User = require('../models/userr');
const Produit = require('../models/produit');
const Produitc = require('../controllers/produit');

async function createStatsFromCommandes() {
    try {
        // Récupérer tous les utilisateurs qui ont aimé
        const usersLiked = await User.countDocuments({ aime: true });

        // Récupérer toutes les commandes
        const commandes = await Commande.find();

        // Initialiser une Map pour stocker le nombre de commandes par produit
        let totalCommandesParProduit = new Map();

        // Parcourir chaque commande pour compter le nombre de fois où chaque produit a été commandé
        commandes.forEach(commande => {
            commande.produits.forEach(({ produit }) => {
                // Incrémenter le nombre de commandes pour ce produit dans la Map
                totalCommandesParProduit.set(produit.toString(), (totalCommandesParProduit.get(produit.toString()) || 0) + 1);
            });
        });

        // Créer une nouvelle instance de StatCommande avec les données de la Map
        const newStat = new StatCommande({
            nombreProduitsCommandes: Object.fromEntries(totalCommandesParProduit),
            avisClient: usersLiked  / User.length, // Score d'avis client global
            produitplusvendus: [] // Initialisez le tableau produitplusvendus avec une valeur vide
        });

        // Récupérer les IDs des produits les plus vendus
        const topProducts = [...totalCommandesParProduit.entries()]
            .sort((a, b) => b[1] - a[1]) // Tri par nombre total de ventes décroissant
            .slice(0, 3) // Sélectionnez les 3 produits les plus vendus
            .map(entry => entry[0]); // Récupérer les IDs des produits

        // Ajouter les produits les plus vendus au tableau produitplusvendus en récupérant leurs noms
        newStat.produitplusvendus = await Produit.find({ _id: { $in: topProducts } }).select('name'); // Sélectionnez uniquement le nom des produits

        // Enregistrer la nouvelle statistique dans la base de données
        await newStat.save();
        console.log("Stats de commande créées avec succès.");
    } catch (error) {
        console.error("Erreur lors de la création des stats de commande:", error);
    }
}

const getProduitNoms = async (req, res) => {
        try {
            // Rechercher toutes les collections de statistiques de commande
            const allStatCommandes = await StatCommande.find();
    
            // Vérifier s'il y a des collections de statistiques de commande
            if (!allStatCommandes || allStatCommandes.length === 0) {
                // Si aucune collection n'est trouvée, renvoyer un message d'erreur
                return res.status(404).send("Aucune statistique de commande trouvée.");
            }
    
            // Initialiser un tableau pour stocker les noms des produits avec leurs statistiques
            let produitsAvecStatistiques = [];
    
            // Parcourir toutes les collections de statistiques de commande
            for (const stat of allStatCommandes) {
                // Récupérer les IDs et les nombres de produits vendus dans la collection actuelle de statistiques de commande
                const produitIds = stat.produitplusvendus;
                const nombreProduitsVendus = stat.nombreProduitsCommandes;
    
                // Rechercher les noms des produits associés aux IDs dans la collection Produit
                const produits = await Produit.find({ _id: { $in: produitIds } }).select('name');
    
                // Créer un objet pour chaque produit avec son nom et son nombre de ventes
                const produitsAvecStats = produits.map((produit, index) => ({
                    name: produit.name,
                    nombreVentes: nombreProduitsVendus[produitIds[index]]
                }));
    
                // Ajouter les produits avec leurs statistiques au tableau
                produitsAvecStatistiques.push(produitsAvecStats);
            }
    
            // Renvoyer les produits avec leurs statistiques en réponse
            res.status(200).send(produitsAvecStatistiques);
        } catch (error) {
            // En cas d'erreur, renvoyer un message d'erreur avec le statut 400
            console.error("Erreur lors de la récupération des produits avec leurs statistiques :", error);
            res.status(400).send("Erreur lors de la récupération des produits avec leurs statistiques.");
        }
    }
    

    
    



module.exports = {
    createStatsFromCommandes,
    getProduitNoms
};
