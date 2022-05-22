const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

var models = require('../models'); // loads index.js
var actualite = models.Actualite;       // the model keyed by its name
const link = sequelize.define('Actu_themes', {}, {freezeTableName: true}, { timestamps: false });


// GET /actualites : Renvoie une liste de toutes les actualités contenant leur id, créateur, date de publication et titre
router.get('/', (req, res) =>
    actualite.findAll()
        .then(actus => {
            const act = {
                context: actus.map(data => {
                    return {
                        id: data.id,
                        id_users: data.id_users,
                        date_publication: data.date_publication,
                        titre: data.titre,
                    }
                })
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(act.context));
        })
        .catch(err => res.status(500).json({ message: err }))
);


// POST /actualites : Ajoute une nouvelle actualité
router.post('/',(req, res) => {
    let {id_users, date_publication, titre, titre2, texte} = req.body;
    let errors = [];
    // validate fields
    if(!id_users){errors.push({text: "No user's id"})};
    if(!date_publication){errors.push({text: "No publication date"})};
    if(!titre){errors.push({text: "No title"})};
    if(!titre2){errors.push({text: "No second title"})};
    if(!texte){errors.push({text: "No text"})};
    //check for errors
    if(errors.length != 0){
        res.send(JSON.stringify(errors))
    } else {
        //insert into table
        actualite.create({
            id_users,
            date_publication,
            titre,
            titre2,
            texte
        })
            .then(actu =>{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "Actualite added"}));
            })
            .catch(err => res.status(500).json({message: err}))
        }   
    }  
);


// GET /actualites/id : Renvoie les informations sur un thème spécifié par son id
router.get('/:id_actualites',(req,res)=>{
    id_actualites = req.params.id_actualites;
    actualite.findByPk(id_actualites)
        .then(act => 
            res.json(act)
        )
        .catch(err => res.status(500).json({message: err}));
});


// PUT /actualites/id : Modifie l'actualité dont l'id est spécifié
router.put('/:id_actualites',(req,res)=>{
    id_actualites = req.params.id_actualites;
    try {
        var obj = JSON.parse(req.body.data).value;
    } catch {
        var obj = req.body;
    }
    let {id_users, date_publication, titre, titre2, texte, vignette, lien} = obj;
    console.log(req.body);
    // update in the table
    actualite.update({
        id_users,
        date_publication,
        titre,
        titre2,
        texte,
        vignette,
        lien
        },
        {where: {id: id_actualites}}
    )
        .then(act => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "Theme modified"}));
        })
        .catch(err => res.status(500).json({message: err})) 
    }   
);


// DELETE /actualites/id : Supprime l'actualité dont l'id est spécifié
router.delete('/:id_actualites',(req,res)=>{
    id_actualites = req.params.id_actualites;
    actualite.findByPk(id_actualites) //Supprimer cette ligne lors de la màj des links
    .then(
        // Delete actualite
        actualite.destroy({
            where: {id: id_actualites}
        }).then( data =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "Actualite deleted"}));
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  
});



module.exports = router;