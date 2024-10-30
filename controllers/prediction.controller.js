//var ServicioService = require('../services/servicio.service');
//var UsuarioService = require('../services/user.service');
var PredictionService = require('../services/prediction.service');
//const streamifier = require('streamifier');

// Saving the context of this module inside the _the variable
_this = this;

//con filtros en la busqueda
exports.getPrediction = async function (req, res, next) {
    //ahi adentro de la request me van a llegar los parametros que quiero cambiar basicamente
    try {
        var Predictions = await PredictionService.getPrediction();
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Predictions, message: "Succesfully predictions Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
