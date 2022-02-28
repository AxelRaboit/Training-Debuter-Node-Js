const express = require('express')
const app = express()
var morgan = require('morgan')

//Ressources statiques
app.use(express.static('public'))

app.use(morgan('dev'))

app.get('/home', function (req, res) {
  res.status(200).sendFile('./IHM/home.html', {root : __dirname})
})

app.get('/profile', function (req, res) {
    res.status(200).sendFile('./IHM/profile.html', {root : __dirname})
})

app.get('/', function (req, res) {
    res.status(300).redirect('/home')
})

app.use((req, res) => {
    res.status(404).sendFile('./IHM/error.html', {root : __dirname})
})

app.listen(3001, () => {
    console.log('En attente de requête au port 3001')
})