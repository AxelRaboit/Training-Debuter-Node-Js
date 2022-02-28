/* const fs = require('fs');

//Gestion dossier
if(fs.existsSync('./myFiles')){
    fs.rmdir('./myFiles', (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Dossier supprimé avec succès !')
        }
    })
} else {
    fs.mkdir('./myFiles', (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Dossier créé avec succès')
        }
    })
} */

/* //Création d'un fichier
const fs = require('fs');

fs.writeFile('./myFiles/file.txt', 'Je dev en Node Js', () => {
    console.log('Création du fichier avec succès !')
}) */

/* //Lire un fichier
const fs = require('fs');

fs.readFile('./myFiles/file.txt', (err, data) => {
    if(err) {
        console.log(err)
    }
     else {
         console.log(data.toString())
     }
}) */

//Suppression de fichier
const fs = require('fs');

if(fs.existsSync('./myFiles/file.txt')){
    fs.unlink('./myFiles/file.txt', (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Fichier supprimé avec succès !')
        }
    })
} else {
    console.log('Impossible de supprimer un fichier non existant.')
}