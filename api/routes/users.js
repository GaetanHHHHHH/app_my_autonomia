const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

var models = require('../models'); // loads index.js
var user = models.User;       // the model keyed by its name


// GET /users : Renvoie une liste de tous les users contenant leur id, email, statut et droits
router.get('/', (req, res) =>
    user.findAll()
        .then(users => {
            const usr = {
                context: users.map(data => {
                    return {
                        id: data.id,
                        login: data.login,
                        statut: data.statut,
                        droits: data.droits,
                    }
                })
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(usr.context));
        })
        .catch(err => res.status(500).json({ message: err }))
);


// POST /users : Ajoute un nouvel user
router.post('/',(req, res) => {
    let {login, password} = req.body;
    let errors = [];
    // validate fields
    if(!login){errors.push({text: "No login"})};
    if(!password){errors.push({text: "No password"})};
    //check for errors
    if(errors.length != 0){
        res.send(JSON.stringify(errors))
    } else {
        //insert into table
        user.create({
            login,
            password,
        })
            .then(usr =>{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message: "User added"}));
            })
            .catch(err => res.status(500).json({message: err}))
        }   
    }  
);


// GET /users/id : Renvoie les informations sur un user spécifié par son id
router.get('/:id_users',(req,res)=>{
    id_users = req.params.id_users;
    user.findByPk(id_users)
        .then(usr => 
            res.json(usr)
        )
        .catch(err => res.status(500).json({message: err}));
});


// PUT /users/id : Modifie le user dont l'id est spécifié
router.put('/:id_users',(req,res)=>{
    id_users = req.params.id_users;
    try {
        var obj = JSON.parse(req.body.data).value;
    } catch {
        var obj = req.body;
    }
    let {login, password, statut, droits, profils} = obj;
    // update in the table
    user.update({
        login,
        password,
        statut,
        droits,
        profils
        },
        {where: {id: id_users}}
    )
        .then(usr =>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "User modified"}));
        })
        .catch(err => res.status(500).json({message: err})) 
    }   
);


// DELETE /users/id : Supprime le user dont l'id est spécifié
router.delete('/:id_users',(req,res)=>{
    id_users = req.params.id_users;
    user.findByPk(id_users) //Supprimer cette ligne lors de la màj des links
    .then(
        // Delete theme
        user.destroy({
            where: {id: id_users}
        }).then( data => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({message: "User deleted"}));
        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    ).catch(err => {
        res.status(500).json({message: err.message})
    })  
});



module.exports = router;