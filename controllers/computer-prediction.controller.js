var ComputerService = require('../services/computer-prediction.service');

_this = this;


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
