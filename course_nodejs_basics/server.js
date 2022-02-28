const http = require('http');
const fs = require('fs');
const uuid = require('uuid');

const server = http.createServer((req, res) => {
    
    //Test de notre nouveau package uuid
    console.log(uuid.v4())

    //Definition de l'en-tete
    res.setHeader('content-type', 'text/html');

    //Definition de la reponse selon la demande du client
    if(req.url === '/home') {
        file = './IHM/home.html'
    }
    else if(req.url === '/profile') {
        file = './IHM/profile.html'
    }
    else {
        file = './IHM/error.html'
    }
    //Lecture du fichier HTML et envoi de la réponse
    fs.readFile(file, (err, data) => {
        if(err) {
            console.log(err)
            res.end();
        } else {
            res.end(data);
        }
    })
})

server.listen(3001, "localhost", () => {
    console.log('Ready to listen on port 3001')
})
