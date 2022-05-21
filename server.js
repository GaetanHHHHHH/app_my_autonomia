// Imports
var express = require('express');
var bodyParser = require('body-parser');
const { sequelize } = require('./models');
const path = require('path');

// Instantiate server 
var server = express();

// Test
sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error" + err))

// Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Configure routes
    // Index route
server.get('/', (req, res) => res.render('index', { layout: 'landing' }));
    // All routes
server.use('/themes', require('./routes/themes'));
server.use('/actualites', require('./routes/actualites'));
server.use('/users', require('./routes/users'));
server.use('/actu_themes', require('./routes/actu_themes'));

// Launch server
server.listen(8080, function() {
    console.log('Serveur en ligne...');
});