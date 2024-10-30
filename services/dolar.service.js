var Dolar = require('../models/Dolar.model');

// Servicio para obtener el precio del dólar
exports.getPrecioDolar = async function () {
    try {
        // Obtener el último precio del dólar (asumiendo que solo hay un documento)
        var dolar = await Dolar.findOne();
        console.log(dolar)
        return dolar;
    } catch (e) {
        console.error("Error al obtener el precio del dólar", e);
        throw Error('Error al obtener el precio del dólar');
    }
};
