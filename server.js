const express= require('express');
 require('./config/connect')
const app = express();


const categorieRoute=require('./routes/categorie');
const produitRoute=require('./routes/produit');
const userRoute=require('./routes/user');
const favoriteRoute=require('./routes/favorite');

app.use(express.json());

app.use('/categorie',categorieRoute);
app.use('/produit',produitRoute);
app.use('/user',userRoute);
app.use('/favorite',favoriteRoute);
app.use(express.json());

app.use('/image' , express.static('./uploads'));


app.listen (3000, ()=>{

console.log('server work');

})