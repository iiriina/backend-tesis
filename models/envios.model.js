const mongoose = require('mongoose');

// Esquema para la colección envios
const EnvioSchema = new mongoose.Schema({
    envio: { type: String, required: true },  // Tipo de envío (e.g., "Economy")
    pesoKG: { type: String, required: true },  // Peso en KG
    precio: { type: Number, required: true }  // Precio en USD
});

// Crear el modelo basado en el esquema
const Envio = mongoose.model('Envio', EnvioSchema, 'enviosFedex');

module.exports = Envio;
