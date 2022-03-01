const express = require('express');
const app = express();
const mySql = require('mysql');
const myConnection = require('express-myconnection');
const notesRoute = require('./routes/notesRoute');

const optionBd = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'notes_training_nodejs'
};

//Extraction des datas du formulaire
app.use(express.urlencoded({extended: false}))


//Definition du middleware pour connexion avec la bd
app.use(myConnection(mySql, optionBd, 'pool'));


//Definition du moteur d'affichage
app.set('view engine', 'ejs')
app.set('views', 'IHM')

//Definition des routes pour notes
app.use(notesRoute)
//Possibilité d'ajouter une url personalisé
/* app.use('/notesapp', notesRoute) */

app.get('/about', (req, res) => {
    res.status(200).render('about')
})

app.use((req, res) => {
    res.status(404).render('pageNotFound')
})

app.listen(3001);
console.log('Attente de requête qu port 3001');
