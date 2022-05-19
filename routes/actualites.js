const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
//const dest = require('../models/Destination');

var models = require('../models'); // loads index.js
var actualite = models.actualite;       // the model keyed by its name
const link = sequelize.define('Actu_themes', {}, {freezeTableName: true}, { timestamps: false });