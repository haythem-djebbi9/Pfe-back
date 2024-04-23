const express= require('express');
 require('./config/connect')
const app = express();


const categorieRoute=require('./routes/categorie');
const produitRoute=require('./routes/produit');
const couleurRoute=require('./routes/couleur');
const userRoute=require('./routes/userr');
const panierRoute=require('./routes/panier');

const promotionRoute=require('./routes/promotion');
const favoirRoute=require('./routes/favoir');
const commandeRoute=require('./routes/commande');
const feedbackRoute=require('./routes/feedback');

const commandecouleurRoute=require('./routes/commandecouleur');
const adminRoute=require('./routes/admin');
const livreurRoute=require('./routes/livreur');
const statcommandeRoute=require('./routes/statcommande');















app.use(express.json());

app.use('/categorie',categorieRoute);
app.use('/produit',produitRoute);
app.use('/couleur',couleurRoute);
app.use('/user',userRoute);
app.use('/panier',panierRoute);
app.use('/promotion',promotionRoute);
app.use("/favoir",favoirRoute);

app.use("/commande",commandeRoute);

app.use("/feedback",feedbackRoute);
app.use("/commandecouleur",commandecouleurRoute);
app.use("/admin",adminRoute);
app.use("/livreur",livreurRoute);

app.use("/statcommande",statcommandeRoute);





app.use(express.json());

app.use('/image' , express.static('./uploads'));


app.listen (3000, ()=>{

console.log('server work');

})