const Panier = require('../models/panier');

exports.ajouterProduit = async (req, res) => {
    const { userId, produitId } = req.body;
    try {
        let panier = await Panier.findOne({ user: userId });

        if (!panier) {
            panier = new Panier({
                user: userId,
                produits: [{ produit: produitId }]
            });
        } else {
            const existingProduct = panier.produits.find(
                item => item.produit.toString() === produitId
            );

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
    const { userId, produitId } = req.params;
    try {
        const panier = await Panier.findOne({ user: userId });

        if (!panier) {
            return res.status(404).json({ message: 'Panier non trouvé.' });
        }

        panier.produits = panier.produits.filter(item => item.produit.toString() !== produitId);

        await panier.save(); // Utiliser save() au lieu de deleteOne()

        res.status(200).json({ message: 'Produit supprimé du panier avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit du panier.' });
    }
};

exports.isProduitDansPanier = async (req, res) => {
    const { userId, produitId } = req.params;
    try {
        const panier = await Panier.findOne({ user: userId });

        if (!panier) {
            return res.status(404).json({ message: 'Panier non trouvé.' });
        }

        const isDansPanier = panier.produits.some(item => item.produit.toString() === produitId);

        res.status(200).json(isDansPanier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la vérification du produit dans le panier.' });
    }
};
