const nodemailer = require('nodemailer');
const Promotion = require('../models/promotion');
const User = require('../models/userr');

const sendPromotionEmails = async (req, res) => {
  try {
    // Récupérer la description de la promotion
    const { description } = req.body;

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

    // Envoyer la promotion à chaque utilisateur
    for (const user of users) {
      // Créer une nouvelle promotion pour l'utilisateur actuel
      const promotion = new Promotion({
        description: description,
        user: user._id
      });
      await promotion.save();

      // Envoyer l'e-mail de promotion à l'utilisateur
      const mailOptions = {
        from: 'djebbihaitem9@gmail.com',
        to: user.email,
        subject: 'Nouvelle Promotion!',
        text: description
      };
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: "Promotion envoyée avec succès à tous les utilisateurs." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendPromotionEmails
};
