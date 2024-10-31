var CellphonesComtrade = require('../models/cellphones-comtrade.model');

// Servicio para obtener todos los registros de Cellphones-Comtrade
exports.getCellphonesComtrade = async function () {
    try {
        // Obtener todos los registros de Cellphones-Comtrade
        var records = await CellphonesComtrade.find();
        console.log(records); // Muestra todos los documentos en la consola
        return records;
    } catch (e) {
        console.error("Error al obtener los registros de Cellphones-Comtrade", e);
        throw Error('Error al obtener los registros de Cellphones-Comtrade');
    }
};
