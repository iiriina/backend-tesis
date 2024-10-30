//var UsuarioService = require('../services/user.service');
var CellphoneService = require('../services/cellphone-recommendations.service');
//const streamifier = require('streamifier');

// Saving the context of this module inside the _the variable
_this = this;

// Controlador de celulares con paginación y filtros
exports.getCellphones = async function (req, res, next) {
    const { page, limit, ...filters } = req.query;  // Extraer los parámetros de paginación y los filtros

    try {
        // Llamar al servicio para obtener los celulares
        const Cellphones = await CellphoneService.getCellphones({ ...filters, page, limit });

        // Retornar la respuesta con la estructura adecuada
        return res.status(200).json({
            status: 200,
            data: Cellphones.data,
            currentPage: Cellphones.currentPage,
            totalPages: Cellphones.totalPages,
            totalItems: Cellphones.totalItems,
            message: "Successfully Cellphones Received"
        });
    } catch (e) {
        // Manejo de errores
        return res.status(400).json({ status: 400, message: e.message });
    }
};


// Importamos el servicio que maneja la lógica de búsqueda en la base de datos
var CellphoneService = require('../services/cellphone-recommendations.service');

exports.getCellphoneById = async function (req, res, next) {
    let id_celular = req.query.id_celular;  // Tomar el parámetro `id_celular` de la query (también podrías usar req.params)

    try {
        var celular = await CellphoneService.getCellphoneById(id_celular);
        
        // Si no encuentra el celular
        if (!celular) {
            return res.status(404).json({ status: 404, message: "Celular no encontrado" });
        }

        // Devuelve el celular encontrado
        return res.status(200).json({ status: 200, data: celular, message: "Celular obtenido exitosamente" });
    } catch (e) {
        // Retorna un error en caso de que algo falle
        return res.status(400).json({ status: 400, message: e.message });
    }
}
