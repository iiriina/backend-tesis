var TributosComputadoras = require('../models/tributosComputadoras.model');

exports.getDatosTributosComputadoras = async function () {
    try {
        var datos = await TributosComputadoras.findOne();
        return datos;
    } catch (e) {
        console.error("Error al obtener los datos de tributos computadoras", e);
        throw Error('Error al obtener los datos de tributos computadoras');
    }
};
