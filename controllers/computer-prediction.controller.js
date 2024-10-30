var ServicioService = require('../services/servicio.service');
//var UsuarioService = require('../services/user.service');
var ComputerService = require('../services/computer-prediction.service');
//const streamifier = require('streamifier');

// Saving the context of this module inside the _the variable
_this = this;

// Antes de paginar con filtros en la busqueda
{/* exports.getComputers = async function (req, res, next) {
    //ahi adentro de la request me van a llegar los parametros que quiero cambiar basicamente
    let filtro= req.query;
    try {
        var Computadoras = await ComputerService.getComputers(filtro);
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Computadoras, message: "Succesfully Computers Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
*/}

//controlador de computadoras paginadas
exports.getComputers = async function (req, res, next) {
    const { page, limit, ...filters } = req.query;  // Obtener los parámetros page y limit, junto con los filtros

    try {
        const Computadoras = await ComputerService.getComputers({ ...filters, page, limit });
        return res.status(200).json({
            status: 200,
            data: Computadoras.data,
            currentPage: Computadoras.currentPage,
            totalPages: Computadoras.totalPages,
            totalItems: Computadoras.totalItems,
            message: "Successfully Computers Recieved"
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.getComputerById = async function (req, res, next) {
    console.log("id que le llega al back", req.query.id_computer)

    let id_computer = req.query.id_computer;  // Tomar el parámetro `id_computer` de la query
    console.log("entra acá??")

    try {
        var computer = await ComputerService.getComputerById(id_computer);
        
        // Si no encuentra la computadora
        if (!computer) {
            return res.status(404).json({ status: 404, message: "Computadora no encontrada" });
        }

        // Devuelve la computadora encontrada
        return res.status(200).json({ status: 200, data: computer, message: "Computadora obtenida exitosamente" });
    } catch (e) {
        // Retorna un error en caso de que algo falle
        return res.status(400).json({ status: 400, message: e.message });
    }
};
