var DolarService = require('../services/dolar.service');

// Guardar el contexto de este módulo en la variable _this
_this = this;

// Función asíncrona del controlador para obtener el precio del dólar
exports.getDolar = async function (req, res, next) {
    try {
        // Obtener el precio del dólar llamando al servicio correspondiente
        var dolar = await DolarService.getPrecioDolar();
        
        // Retornar el precio del dólar con el código HTTP 200 y un mensaje de éxito
        return res.status(200).json({status: 200, data: dolar, message: "Precio del dólar obtenido exitosamente"});
    } catch (e) {
        // Retornar un mensaje de error con el código HTTP 400 si algo falla
        return res.status(400).json({status: 400, message: e.message});
    }
}
