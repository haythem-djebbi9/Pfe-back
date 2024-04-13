const Produit = require('../models/produit');
const nodemailer = require('nodemailer');

const User = require('../models/userr');



const createProduit = async (req, res, fileName) => {

    try {

        let produit = new Produit({
            ...req.body,
            image: fileName
        });
        let savedProduit = await produit.save();
        res.status(200).send(savedProduit);

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
            // Envoyer l'e-mail de promotion à l'utilisateur
            const mailOptions = {
              from: 'djebbihaitem9@gmail.com',
              to: user.email,
              subject: 'Nouvelle produit!',
              text: `Un nouveau produit a été ajouté. Découvrez-le : ${produit.name}`
            };
            await transporter.sendMail(mailOptions);
          }
        } catch (error) {
          res.status(400).send(error);
        }
      };
       

    




const getAllProduit = async (req, res) => {

    try {
        let result = await Produit.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'idCat',
                    foreignField: '_id',
                    as: 'categorie'
                }
            }
        ])
        res.status(200).send(result);

    } catch (error) {
        res.status(400).send(error);
    }

}

const getProduitByCat = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Produit.find({ idCat: id });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}



const getProduitById = async (req, res) => {

    try {

        let id = req.params.id;
        let result = await Produit.findById({ _id: id });

        res.status(200).send(result);

    } catch (error) {
        res.status(400).send(error);
    }

}

const deleteProduit = async (req, res) => {

    try {

        let id = req.params.id;
        const deletedProduit = await Produit.findByIdAndDelete({ _id: id });
        res.status(200).send(deletedProduit);

    } catch (error) {
        res.status(400).send(error);
    }

}

const updateProduit = async (req, res, fileName) => {

    try {
        
        let id = req.params.id;
        let data = req.body;
        if(fileName.length>0){
            data.image = fileName;
        }
 
        let result = await Produit.findByIdAndUpdate( { _id: id }, data );
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}




module.exports = {
    createProduit,
    getAllProduit,
    getProduitById,
    deleteProduit,
    updateProduit,
    getProduitByCat
}