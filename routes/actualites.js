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
router.post('/add',(req, res) => {
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


// GET /themes/id : Renvoie les informations sur un thème spécifié par son id
router.get('/:id_themes',(req,res)=>{
    id_themes = req.params.id_themes;
    console.log(id_themes)
    theme.findByPk(id_themes)
        .then( tms => 
            res.json(tms)
        )
        .catch(err => res.status(500).json({message: err}));
});


// PUT /themes/id : Modifie le thème dont l'id est spécifié
router.put('/:id_themes',(req,res)=>{
    id_themes = req.params.id_themes;
    try {
        var obj = JSON.parse(req.body.data).value;
    } catch {
        var obj = req.body;
    }
    let {nom_theme} = obj;
    console.log(req.body);
    // update in the table
    theme.update({
        nom_theme
        },
        {where: {id: id_themes}}
    )
        .then(tms =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "Theme modified"}));
        })
        .catch(err => res.status(500).json({message: err})) 
    }   
);


// DELETE /themes/id : Supprime le thème dont l'id est spécifié
router.delete('/:id_themes',(req,res)=>{
    id_themes = req.params.id_themes;
    // Delete all links
    // link.destroy({
    //     where: {
    //         id_themes: id_themes
    //     }
    // })
    theme.findByPk(id_themes) //Supprimer cette ligne lors de la màj des links
    .then(
        // Delete theme
        theme.destroy({
            where: {id: id_themes}
        }).then( data =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "Theme deleted"}));
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  
});



module.exports = router;