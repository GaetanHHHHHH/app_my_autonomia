// Imports
var express = require('express');
var bodyParser = require('body-parser');
const { sequelize } = require('./api/models');
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
server.use('/api/themes', require('./api/routes/themes'));
server.use('/api/actualites', require('./api/routes/actualites'));
server.use('/api/users', require('./api/routes/users'));
server.use('/api/actu_themes', require('./api/routes/actu_themes'));

// Launch server
server.listen(8080, function() {
    console.log('Serveur en ligne...');
});