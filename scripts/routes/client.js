'use strict'

var express = require('express');
var ClientController = require('../controllers/client');

var api = express.Router();

api.get('/search-email/:email', ClientController.searchByEmail);
api.get('/search-dni/:dninif', ClientController.searchByDni);
api.post('/save-client', ClientController.saveClient);

module.exports = api;