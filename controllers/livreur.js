const  Livreur=require('../models/livreur');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registre=async(req,res)=>{
  try {
    let admin=new Livreur(req.body);
  
  
  admin.password=bcrypt.hashSync(req.body.password,10);
  
  
    let result=await admin.save();
    res.status(200).send(result);
  
  
  } catch (error) {
     res.status(500).send(error);
  }
  
  
  
  }

  const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let result = await Livreur.findOne({ email: email });

        if (!result) {
            return res.status(401).send('Email invalide');
        }

        let valid = bcrypt.compareSync(password, result.password);

        if (!valid) {
            return res.status(401).send('Mot de passe invalide');
        }

        let payload = {
            _id: result._id,
            name: result.name,
            prenom: result.prenom,
            telephone: result.telephone,
            email: result.email,
        };

        let token = jwt.sign(payload, '123456789');
        res.status(200).send({ mytoken: token });

    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteLivreur = async (req, res) => {
    try {
        const livreurId = req.params.livreurId;
        const deletedLivreur = await Livreur.findByIdAndDelete(livreurId);
        if (!deletedLivreur) {
            return res.status(404).json({ message: "livreur introuvable." });
        }
        res.status(200).json({ message: "livreur supprimé avec succès." });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Fonction pour afficher tous les administrateurs
const getAllLivreur = async (req, res) => {
    try {
        const admins = await Livreur.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports={
registre,
login,
deleteLivreur,
getAllLivreur

}

