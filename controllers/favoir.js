const Favoir = require('../models/favoir');

exports.ajouterProduit = async (req, res) => {
    try {
        const { userId, produitId } = req.body;

        let panier = await Favoir.findOne({ user: userId });

        if (!panier) {
            panier = new Favoir({
                user: userId,
                produits: [{ produit: produitId }]
            });
        } else {
            const existingProduct = panier.produits.find(item => item.produit.toString() === produitId);

            if (existingProduct) {
                return res.status(400).json({ message: 'Le produit est déjà dans le panier.' });
            }
            panier.produits.push({ produit: produitId });
        }

        await panier.save();

        res.status(201).json(panier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du produit au panier.' });
    }
};

exports.supprimerProduit = async (req, res) => {
    try {
        const { userId, produitId } = req.params;

        const panier = await Favoir.findOne({ user: userId });

        if (!panier) {
            return res.status(404).json({ message: 'Panier non trouvé.' });
        }

        panier.produits = panier.produits.filter(item => item.produit.toString() !== produitId);

        await panier.save();

        res.status(200).json({ message: 'Produit supprimé du panier avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit du panier.' });
    }
    
};

exports.isProduitFavori = async (req, res) => {
    try {
        const userId = req.params.userId;
        const produitId = req.params.produitId;

        // Recherchez dans la collection des favoris pour voir si une entrée correspondante existe
        const favori = await Favoir.findOne({ user: userId, 'produits.produit': produitId });

        // Si une entrée est trouvée, le produit est dans les favoris, sinon, il ne l'est pas
        const isProduitFavori = !!favori;

        res.status(200).json(isProduitFavori);
    } catch (error) {
        console.error('Erreur lors de la vérification si le produit est favori :', error);
        res.status(500).json({ message: 'Erreur lors de la vérification si le produit est favori' });
    }
};

