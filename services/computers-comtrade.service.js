var ComputersComtrade = require('../models/computers-comtrade.model');

// Servicio para obtener todos los registros de Computers-Comtrade
exports.getComputersComtrade = async function () {
    try {
        // Obtener todos los registros de Computers-Comtrade
        var records = await ComputersComtrade.find();
        console.log(records); // Muestra todos los documentos en la consola
        return records;
    } catch (e) {
        console.error("Error al obtener los registros de Computers-Comtrade", e);
        throw Error('Error al obtener los registros de Computers-Comtrade');
    }
};
