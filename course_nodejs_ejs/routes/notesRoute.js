const express = require('express');
const router = express.Router()

//Method to read data
router.get('/', (req, res) => {

    req.getConnection((err, connection) => {
        if(err) {
            console.log(err)
            //le premier parametre de render est le nom du fichier sans l'extension
            res.status(500).render('error', {err})
        } else {
            connection.query('SELECT * FROM notes', [], (err, result) => {
                if(err) {
                    console.log(err)
                    //le premier parametre de render est le nom du fichier sans l'extension
                    res.status(500).render('error', {err})
                } else {
                    res.status(200).render('index', { result });
                }
            })
        }
    })
})

//Method to post data
router.post('/notes', (req, res) => {
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
            //le premier parametre de render est le nom du fichier sans l'extension
            res.status(500).render('error', {err})
        } else {
            connection.query(
            reqSql,
            data,
            (err, result) => {
                if(err) {
                    console.log(err)
                    //le premier parametre de render est le nom du fichier sans l'extension
                    res.status(500).render('error', {err})
                } else {
                    res.status(300).redirect('/');
                }
            })
        }
    })
})

//Method to delete data
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    req.getConnection((err, connection) => {
        if(err) {
            console.log(err)
            //le premier parametre de render est le nom du fichier sans l'extension
            res.status(500).render('error', {err})
        } else {
            connection.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
                if(err) {
                    console.log(err)
                    //le premier parametre de render est le nom du fichier sans l'extension
                    res.status(500).render('error', {err})
                } else {
                    res.status(200).json({routeRacine: '/'})
                }
            })
        }
    })

})

module.exports = router;