const express= require('express');
 require('./config/connect')
const app = express();


const categorieRoute=require('./routes/categorie');
const produitRoute=require('./routes/produit');
const couleurRoute=require('./routes/couleur');
const userRoute=require('./routes/user');




app.use(express.json());

app.use('/categorie',categorieRoute);
app.use('/produit',produitRoute);
app.use('/couleur',couleurRoute);
app.use('/user',userRoute);



app.use(express.json());

app.use('/image' , express.static('./uploads'));


app.listen (3000, ()=>{

console.log('server work');

})