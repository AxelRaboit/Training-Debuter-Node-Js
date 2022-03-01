const express = require('express');
const app = express();
const mySql = require('mysql');
const myConnection = require('express-myconnection');
const { redirect } = require('express/lib/response');

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

//Method to read data
app.get('/', (req, res) => {

    req.getConnection((err, connection) => {
        if(err) {
            console.log(err)
        } else {
            connection.query('SELECT * FROM notes', [], (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).render('index', { result });
                }
            })
        }
    })
})

//Method to post data
app.post('/notes', (req, res) => {
    console.log(req.body)
    let id = req.body.id === '' ? null : req.body.id;
    let title = req.body.title;
    let description = req.body.description;

    let reqSql = id === null 
        ? 'INSERT INTO notes(id, title, description) VALUES(?, ?, ?)'
        : 'UPDATE notes SET title = ?, description = ? WHERE id = ?'
    ;

    let data = id === null 
        ? [null, title, description]
        : [title, description, id]
    ;

    req.getConnection((err, connection) => {
        if(err) {
            console.log(err)
        } else {
            connection.query(
            reqSql,
            data,
            (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(300).redirect('/');
                }
            })
        }
    })
})

//Method to delete data
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, connection) => {
        if(err) {
            console.log(err)
        } else {
            connection.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).json({routeRacine: '/'})
                }
            })
        }
    })

})

app.get('/about', (req, res) => {
    res.status(200).render('about')
})

app.use((req, res) => {
    res.status(404).render('pageNotFound')
})

app.listen(3001);
console.log('Attente de requête qu port 3001');
