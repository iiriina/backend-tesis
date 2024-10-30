var Envio = require('../models/envios.model');

// Servicio para obtener un envío específico por peso y envío
exports.getEnvioEspecifico = async function (envio, pesoKG) {
    try {
        // Realizar una búsqueda usando los criterios especificados
        const envioData = await Envio.findOne({ envio: envio, pesoKG: pesoKG });
        console.log(envioData);
        return envioData;
    } catch (e) {
        console.error("Error al obtener el envío específico", e);
        throw Error('Error al obtener el envío específico');
    }
};
