const mongoose = require('mongoose');

// Esquema para almacenar el precio del dólar
const DolarSchema = new mongoose.Schema({
    dolarOficial: { type: Number, required: true },  // El precio oficial del dólar es obligatorio
    fechaActualizacion: { type: Date, default: Date.now } // Fecha de la última actualización
});

// Crear el modelo basado en el esquema
const Dolar = mongoose.model('Dolar', DolarSchema, 'dolarOficial');

module.exports = Dolar;
