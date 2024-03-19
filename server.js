const express= require('express');
 require('./config/connect')
const app = express();


const categorieRoute=require('./routes/categorie');
const produitRoute=require('./routes/produit');


app.use(express.json());

app.use('/categorie',categorieRoute);
app.use('/produit',produitRoute);

app.use(express.json());

app.use('/image' , express.static('./uploads'));


app.listen (3000, ()=>{

console.log('server work');

})