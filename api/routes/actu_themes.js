const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
var DataTypes = require('sequelize/lib/data-types');

var models = require('../models'); // loads index.js
//var dest = models.Destination;       // the model keyed by its name
var link = sequelize.define('Actu_themes', {id_actualites: DataTypes.INTEGER, id_themes: DataTypes.INTEGER}, {freezeTableName: true}, { timestamps: false });


// GET /actu_themes : Affiche tous les liens existant
router.get('/',(req, res) => {
    link.findAll()    
    .then(links => {
        const linkies = {
            context: links.map(data => {
                return {
                    id: data.id,
                    id_actualites: data.id_actualites,
                    id_themes: data.id_themes
                }
            })
        }
        res.json({links: linkies.context});
        // res.render('links',{links: linkies.context})
    })
    .catch(err => res.status(500).json({message: err})) 
});


// POST /actu_themes : Ajoute un lien entre une actualité et un thème
router.post('/',(req, res) => {
    let {id_actualites, id_themes} = req.body;
    let errors = [];
    // validate fields
    if(!id_actualites){errors.push({text: "No actualite id"})};
    if(!id_themes){errors.push({text: "No theme id"})};
    //check for errors
    if(errors.length != 0){
        res.json({
            errors,
            id_actualites, 
            id_themes
        })
    } else{
        //insert into table
        console.log(id_actualites, id_themes);
        link.create({
            id_actualites, 
            id_themes
        })
            // .then(linkes => res.redirect('/links'))
            .then(res.json({message: "Link added"})) 
            .catch(err => console.log(err))
        }   
    }
);


// GET /actu_themes/id : Renvoie les informations sur un lien particulier
router.get('/:id',(req,res)=>{
    id = req.params.id;
    // console.log(agenId)
    link.findByPk(id)
        .then(data => {
            const linkie = {
                context: {                    
                    // id: data.id,
                    id_actualites: data.id_actualites,
                    id_themes: data.id_themes
                }
            }
            res.json(linkie.context)
        })
        .catch(err => res.status(500).json({message: err}));
});


// PUT /actu_themes/id : Modifie le lien dont l'id est spécifié
router.put('/:id',(req,res)=>{
    id = req.params.id;
    try {
        var obj = JSON.parse(req.body.data).value;
    } catch {
        var obj = req.body;
    }
    let {id_actualites, id_themes} = obj;
    console.log(req.body);
    // update in the table
    link.update({
        id_actualites,
        id_themes
        },
        {where: {id: id}}
    )
        .then(act => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "Link modified"}));
        })
        .catch(err => res.status(500).json({message: err})) 
    }   
);


// DELETE /actu_themes/id : Supprime un lien
router.delete('/:id',(req,res)=>{
    id = req.params.id;
    link.destroy({
        where: {id: id}
    }).then( data =>{
        res.json({message: "Link deleted"});
    }).catch(err => {
        res.status(500).json({message: err.message})
    })

});


module.exports = router;