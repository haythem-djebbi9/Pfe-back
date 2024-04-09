
const Panier = require('../models/panier');

exports.ajouterProduit = async (req, res) => {
    const { userId, produitId } = req.body;
    try {
        // Trouver le panier de l'utilisateur en fonction de son ID
        let panier = await Panier.findOne({ user: userId });

        // Si l'utilisateur n'a pas de panier, créer un nouveau panier
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

exports.afficherProduitsPanier = async (req, res) => {
  const { userId } = req.body;

  try {
      // Trouver le panier de l'utilisateur en fonction de son ID
      const panier = await Panier.findOne({ user: userId }).populate('produits.produit');
      
      if (!panier) {
          return res.status(404).json({ message: 'Panier non trouvé.' });
      }

      res.status(200).json(panier.produits);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des produits du panier.' });
  }
};

// Méthode pour supprimer un produit du panier d'un utilisateur
exports.supprimerProduit = async (req, res) => {
  const { userId, produitId } = req.body;

  try {
      // Trouver le panier de l'utilisateur en fonction de son ID
      const panier = await Panier.findOne({ user: userId });

      if (!panier) {
          return res.status(404).json({ message: 'Panier non trouvé.' });
      }

      // Filtrer les produits pour retirer celui spécifié
      panier.produits = panier.produits.filter(item => item.produit.toString() !== produitId);

      // Enregistrer le panier mis à jour
      await panier.deleteOne();

      res.status(200).json({ message: 'Produit supprimé du panier avec succès.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression du produit du panier.' });
  }
};

