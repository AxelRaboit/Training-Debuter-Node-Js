const express = require('express');
const app = express();

//Definition du moteur d'affichage
app.set('view engine', 'ejs')
app.set('views', 'IHM')

app.get('/', (req, res) => {
    const connectedHour = Date().toString();
    const notes = [
        {title: 'Création de contenu', description: 'Tourner un épisode pour youtube'},
        {title: 'Education Physique', description: 'Course à pied'},
        {title: 'Dessin numérique', description: 'Création d\'une image sur photoshop'},
        {title: 'Magasin', description: 'Faire les courses'}
    ]
    res.status(200).render('index', {connectedHour, notes});
})

app.get('/about', (req, res) => {
    res.status(200).render('about')
})

app.use((req, res) => {
    res.status(404).render('pageNotFound')
})

app.listen(3001);
console.log('Attente de requête qu port 3001');
