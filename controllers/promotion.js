const nodemailer = require('nodemailer');
const Promotion = require('../models/promotion');
const User = require('../models/userr');
const Produit = require('../models/produit');

// Fonction pour restaurer les prix initiaux des produits
const restoreInitialPrices = async (promotion) => {
  const produits = await Produit.find();
  const prixInitiaux = promotion.prixInitiaux;

  produits.forEach(async (produit) => {
    produit.prix = prixInitiaux.get(produit._id);
    await produit.save();
  });
};

const sendPromotionEmails = async (req, res) => {
  try {
    // Récupérer la description et le pourcentage de réduction de la promotion depuis la requête
    const { description, pourcentageReduction } = req.body;

    // Vérifier si le pourcentage de réduction est valide
    if (pourcentageReduction <= 0 || pourcentageReduction >= 100) {
      throw new Error("Le pourcentage de réduction doit être compris entre 0 et 100.");
    }

    // Récupérer tous les produits et stocker les prix initiaux
    const produits = await Produit.find();
    const prixInitiaux = new Map();

    produits.forEach(produit => {
      prixInitiaux.set(produit._id, produit.prix);
    });

    // Calculer le prix réduit à partir du pourcentage de réduction
    const reducedPrice = 1 - (pourcentageReduction / 100);

    // Appliquer la réduction aux prix des produits
    produits.forEach(produit => {
      produit.prix *= reducedPrice;
    });

    // Enregistrer les nouveaux prix des produits
    await Promise.all(produits.map(produit => produit.save()));

    // Récupérer tous les utilisateurs
    const users = await User.find({}, 'email');

    // Configurer le transporteur de messagerie
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'djebbihaitem9@gmail.com',
        pass: 'qumr rooj igto tlaq'
      }
    });

    // Construire le contenu de l'e-mail avec le pourcentage de réduction
    const mailContent = `Bonjour,\n\nNous avons une nouvelle promotion pour vous !\n\nPourcentage de réduction: ${pourcentageReduction}%\nDescription: ${description}\n\nProfitez-en dès maintenant !`;

    // Envoyer l'e-mail de promotion à tous les utilisateurs
    const mailOptions = {
      from: 'djebbihaitem9@gmail.com',
      subject: 'Nouvelle Promotion!',
      text: mailContent
    };

    // Récupérer tous les emails des utilisateurs
    const emails = users.map(user => user.email);

    // Mettre à jour les destinataires de l'e-mail
    mailOptions.to = emails.join(',');

    // Envoyer l'e-mail de promotion à tous les utilisateurs
    await transporter.sendMail(mailOptions);

    // Créer une nouvelle promotion pour chaque utilisateur
    for (const user of users) {
      const promotion = new Promotion({
        description: description,
        user: user._id,
        pourcentageReduction: pourcentageReduction,
        validite: Date.now() + 60 * 1000*60*48, // 1 minute en millisecondes
        prixInitiaux: prixInitiaux // Stocker les prix initiaux
      });
      await promotion.save();
    }

    res.status(200).json({ message: "Promotion envoyée avec succès à tous les utilisateurs." });

    // Planifier la restauration des prix initiaux après une minute
    setTimeout(async () => {
      const expiredPromotions = await Promotion.find({ validite: { $lt: new Date() } });
      if (expiredPromotions.length > 0) {
        expiredPromotions.forEach(async (promotion) => {
          await restoreInitialPrices(promotion);
          await Promotion.findByIdAndDelete(promotion._id);
        });
      }
    }, 60000); // 1 minute

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getall=async (req,res)=>{
  try {
    let result =await Promotion.find();
    res.status(200).send(result);
    
  } catch (error) {
    res.status(500).send(error);
  }
  
  
  
  }
  

module.exports = {
  sendPromotionEmails,
  getall
};
