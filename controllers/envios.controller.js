const EnvioService = require('../services/envios.service');

// Guardar el contexto de este módulo en la variable _this
_this = this;

// Función asíncrona del controlador para obtener un envío específico por peso y envío
exports.getEnvioEspecifico = async function (req, res, next) {
    try {
        // Obtener los parámetros desde la solicitud
        const { envio, pesoKG } = req.query;
        console.log("Me llega del frontend");
        console.log(pesoKG);
        // Validar que los parámetros estén presentes
        if (!envio || !pesoKG) {
            return res.status(400).json({ status: 400, message: "Se requieren los parámetros envio y pesoKG" });
        }

        // Verificar si pesoKG se convirtió correctamente
        if (isNaN(pesoKG)) {
            return res.status(400).json({ status: 400, message: "El parámetro pesoKG debe ser un número válido" });
        }

        // Obtener la información del envío específico llamando al servicio correspondiente
        const envioData = await EnvioService.getEnvioEspecifico(envio, pesoKG);

        if (!envioData) {
            return res.status(404).json({ 
                status: 404, 
                message: `No se encontró el envío con los parámetros especificados: envio=${envio}, pesoKG=${pesoKGFinal}` 
            });
        }

        // Retornar la información del envío con el código HTTP 200 y un mensaje de éxito
        return res.status(200).json({ status: 200, data: envioData, message: "Envío obtenido exitosamente" });
    } catch (e) {
        // Retornar un mensaje de error con el código HTTP 400 si algo falla
        return res.status(400).json({ status: 400, message: e.message });
    }
};
