var TributosComputadorasService = require('../services/tributosComputadoras.service');

// Guardar el contexto de este módulo en la variable _this
_this = this;

// Función asíncrona del controlador para obtener los datos de tributos computadoras
exports.getTributosComputadoras = async function (req, res, next) {
    try {
        // Llama al servicio para obtener los datos de tributos computadoras
        var datosTributosComputadoras = await TributosComputadorasService.getDatosTributosComputadoras();
        
        // Retornar los datos con el código HTTP 200 y un mensaje de éxito
        return res.status(200).json({status: 200, data: datosTributosComputadoras, message: "Datos de tributos computadoras obtenidos exitosamente"});
    } catch (e) {
        // Retornar un mensaje de error con el código HTTP 400 si algo falla
        return res.status(400).json({status: 400, message: e.message});
    }
};
