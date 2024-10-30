var PuertaAPuertaService = require('../services/impuestosPuertaAPuerta.service');

// Guardar el contexto de este módulo en la variable _this
_this = this;

// Función asíncrona del controlador para obtener los datos de puerta a puerta
exports.getPuertaAPuerta = async function (req, res, next) {
    try {
        // Cambia "getImpuestosPuertaAPuerta" por "getDatosPuertaAPuerta"
        var datosPuertaAPuerta = await PuertaAPuertaService.getDatosPuertaAPuerta();
        
        // Retornar los datos con el código HTTP 200 y un mensaje de éxito
        return res.status(200).json({status: 200, data: datosPuertaAPuerta, message: "Datos de puerta a puerta obtenidos exitosamente"});
    } catch (e) {
        // Retornar un mensaje de error con el código HTTP 400 si algo falla
        return res.status(400).json({status: 400, message: e.message});
    }
};
