const express= require('express');
 require('./config/connect')
const app = express();

const categorieRoute=require('./routes/categorie');

app.use(express.json());

app.use('/categorie',categorieRoute);
app.use(express.json());


app.listen (3000, ()=>{

console.log('server work');

})