const Couleur = require('../models/couleur');

const createCouleur = async (req, res, fileName) => {

    try {

        let couleur = new Couleur({
            ...req.body,
            image: fileName
        });
        let savedCouleur = await couleur.save();
        res.status(200).send(savedCouleur);

    } catch (error) {
        res.status(400).send(error);
    }

}




const getall=async (req,res)=>{
    try {
      let result =await Couleur.find();
      res.status(200).send(result);
      
    } catch (error) {
      res.status(500).send(error);
    }
}




const getCouleurById = async (req, res) => {

    try {

        let id = req.params.id;
        let result = await Couleur.findById({ _id: id });

        res.status(200).send(result);

    } catch (error) {
        res.status(400).send(error);
    }

}

const deleteCouleur = async (req, res) => {

    try {

        let id = req.params.id;
        const deletedCouleur = await Couleur.findByIdAndDelete({ _id: id });
        res.status(200).send(deletedCouleur);

    } catch (error) {
        res.status(400).send(error);
    }

}

const updateCouleur = async (req, res, fileName) => {

    try {
        
        let id = req.params.id;
        let data = req.body;
        if(fileName.length>0){
            data.image = fileName;
        }
 
        let result = await Couleur.findByIdAndUpdate( { _id: id }, data );
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}




module.exports = {
    createCouleur,
    getall,
    getCouleurById,
    deleteCouleur,
    updateCouleur,
    
}