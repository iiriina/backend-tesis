var TributosCelulares = require('../models/tributosCelulares.model');

exports.getDatosTributosCelulares = async function () {
    try {
        var datos = await TributosCelulares.findOne();
        return datos;
    } catch (e) {
        console.error("Error al obtener los datos de tributos celulares", e);
        throw Error('Error al obtener los datos de tributos celulares');
    }
};
