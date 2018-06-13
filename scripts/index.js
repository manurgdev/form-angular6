'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/form_angular', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('La conexión a la base de datos está funcionando correctamente...');

        app.listen(port, function(){
            console.log("Servidor del api rest express escuchando en puerto "+port);
        })
    }
});