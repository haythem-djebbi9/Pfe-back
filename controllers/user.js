const  User=require('../models/userr');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registre=async(req,res)=>{
  try {
    let admin=new User(req.body);
  
  
  admin.password=bcrypt.hashSync(req.body.password,10);
  
  
    let result=await admin.save();
    res.status(200).send(result);
  
  
  } catch (error) {
     res.status(500).send(error);
  }
  
  
  
  }

  const getUserById = async (req, res) => {

    try {

        let id = req.params.id;
        let result = await User.findById({ _id: id });

        res.status(200).send(result);

    } catch (error) {
        res.status(400).send(error);
    }

}

  const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let result = await User.findOne({ email: email });

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

module.exports={
registre,
login,
getUserById

}

