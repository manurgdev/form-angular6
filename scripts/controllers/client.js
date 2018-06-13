'use strict'

var Client = require('../models/client');

function saveClient(req, res){
    var client = new Client();

    var params = req.body;
    params.email = params.email.toLowerCase();
    params.dninif = params.dninif.toLowerCase();

    if(params._id != ''){
        Client.findByIdAndUpdate(params._id, params, (err, clientUpdated) => {
            if(err){
                res.status(500).send({message: 'Error al actualizar el usuario'});
            }else{
                if(!clientUpdated){
                    res.status(200).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({client: clientUpdated, message: 'Cliente actualizado correctamente'});
                }
            }
        });
    }else{    
        client.name = params.name;
        client.email = params.email.toLowerCase();
        client.dninif = params.dninif.toLowerCase();
        client.newsletter = params.newsletter;
        client.catchmentType = params.catchmentType;
        client.address = params.address;
        client.zipCode = params.zipCode;
        client.region = params.region;
        client.city = params.city;
        client.country = params.country;
        client.observations = params.observations;
    
        if(client.name != null && client.email != null && client.dninif != null && client.catchmentType != null){
            // Guardar el cliente
            client.save((err, clientStored) => {
                if(err){
                    res.status(500).send({message: 'Error al guardar el cliente'});
                }else{
                    if(!clientStored){
                        res.status(200).send({message: 'No se ha registrado el cliente'});
                    }else{
                        res.status(200).send({client: clientStored, message: 'Cliente registrado correctamente'});
                    }
                }
            });
        }else{
            res.status(200).send({message: 'Rellena todos los campos obligatorios'});
        }
    }

}

function searchByEmail(req, res){
    var params = req.params;

    var email = params.email;

    Client.findOne({email: email.toLowerCase()}, (err, client) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!client){
                res.status(200).send({message: 'El cliente no existe'});
            }else{
                res.status(200).send({client});
            }
        }
    });
}

function searchByDni(req, res){
    var params = req.params;

    var dninif = params.dninif;

    Client.findOne({dninif: dninif.toUpperCase(), dninif: dninif.toLowerCase()}, (err, client) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!client){
                res.status(200).send({message: 'El cliente no existe'});
            }else{
                res.status(200).send({client});
            }
        }
    });
}

module.exports = {
    saveClient,
    searchByEmail,
    searchByDni
};