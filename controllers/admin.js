const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour enregistrer un nouvel administrateur
const register = async (req, res) => {
    try {
        let admin = new Admin(req.body);
        admin.password = bcrypt.hashSync(req.body.password, 10);
        let result = await admin.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Fonction pour connecter un administrateur
const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let result = await Admin.findOne({ email: email });
        if (!result) {
            res.status(401).send('Email invalide');
        } 
        let valid = bcrypt.compareSync(password, result.password);
        if (!valid) {
            res.status(401).send('Mot de passe invalide');
        } 
        let payload = {
            _id: result._id,
            name: result.name,
            prenom: result.prenom,
            telephone: result.telephone,
            email: result.email,
            poste: result.poste

        };
        let token = jwt.sign(payload, '123456789');
        res.status(200).send({ mytoken: token });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Fonction pour supprimer un administrateur
const deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Administrateur introuvable." });
        }
        res.status(200).json({ message: "Administrateur supprimé avec succès." });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Fonction pour afficher tous les administrateurs
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    register,
    login,
    deleteAdmin,
    getAllAdmins
};
