const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const saltRounds = 10; // Définir le nombre de tours de salage

        // Générer le sel
        const salt = await bcrypt.genSalt(saltRounds);
        
        // Hasher le mot de passe avec le sel généré
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = new User({
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            telephone: data.telephone,
            password: hashedPassword,
            isAdmin: data.isAdmin
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.status(404).send('Email or password is invalid!');
        }

        // Vérifier le mot de passe
        const validPass = await bcrypt.compare(data.password, user.password);

        if (!validPass) {
            return res.status(401).send('Email or password is invalid!');
        }

        // Vérifier si l'utilisateur est un administrateur
        if (user.isAdmin) {
            const payload = {
                _id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin // Inclure isAdmin dans les données à signer
            };
            const token = jwt.sign(payload, '1234567'); 

            return res.status(200).send({ token });
        } else {
            return res.status(401).send('You are not authorized to access this resource!');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
