var PuertaAPuerta = require('../models/ImpuestosPuertaAPuerta.model');

// Servicio para obtener los datos de puerta a puerta
exports.getDatosPuertaAPuerta = async function () {
    try {
        // Obtener los datos de puerta a puerta (suponiendo que solo hay un documento)
        var datos = await PuertaAPuerta.findOne();
        return datos;
    } catch (e) {
        console.error("Error al obtener los datos de puerta a puerta", e);
        throw Error('Error al obtener los datos de puerta a puerta');
    }
};
