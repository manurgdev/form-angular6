'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    name: String,
    email: String,
    dninif: String,
    newsletter: String,
    catchmentType: String,
    address: String,
    zipCode: String,
    region: String,
    city: String,
    country: String,
    observations: String,
});

module.exports = mongoose.model('Client', ClientSchema);