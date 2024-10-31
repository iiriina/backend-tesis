const mongoose = require('mongoose');

// Esquema para almacenar los datos de Computers-Comtrade
const ComputersComtradeSchema = new mongoose.Schema({
    periodo: { type: String, required: true },  // Formato de período, por ejemplo, "2024-01"
    paisExportador: { type: String, required: true },  // Nombre del país exportador
    tradeValue: { type: Number, required: true },  // Valor del comercio
    pesoKG: { type: Number, required: true }  // Peso en KG
});

// Crear el modelo basado en el esquema
const ComputersComtrade = mongoose.model('ComputersComtrade', ComputersComtradeSchema, 'datosComtradeComputadoras');

module.exports = ComputersComtrade;
