var CellphonesComtradeService = require('../services/cellphones-comtrade.service');

// Guardar el contexto de este módulo en la variable _this
_this = this;

// Función asíncrona del controlador para obtener todos los registros de Cellphones-Comtrade
exports.getCellphonesComtrade = async function (req, res, next) {
    try {
        // Obtener todos los registros llamando al servicio correspondiente
        var records = await CellphonesComtradeService.getCellphonesComtrade();
        
        // Retornar los registros con el código HTTP 200 y un mensaje de éxito
        return res.status(200).json({
            status: 200,
            data: records,
            message: "Registros de Cellphones-Comtrade obtenidos exitosamente"
        });
    } catch (e) {
        // Retornar un mensaje de error con el código HTTP 400 si algo falla
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};
