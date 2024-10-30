var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// Esquema para el dispositivo (teléfono o computadora)
var DispositivoSchema = new mongoose.Schema({
    nombre: String, // Ejemplo: "Motorola Razr 50 Plus" o "iPhone 14 Plus"
    resolucionPantalla: String,
    camaraFrontal: String, // Una cámara frontal
    camarasTraseras: [String], // Varias cámaras traseras
    RAM: String,
    OS: String,
    bateria: String, // Información de la batería
    peso: String, // Peso en gramos, por ejemplo: "189g"
    almacenamiento: String, // Ejemplo: "128GB" o "256GB"
    precio: Number, // Precio en moneda base
    precioArg: Number,
    imagen: String, // URL de la imagen del dispositivo
    colores: [String], // Lista de colores disponibles
    cantidadCamaras: Number, // Número de cámaras en total
    marca: String,
    sistema_operativo: String,
});

// Añadir paginación al esquema
DispositivoSchema.plugin(mongoosePaginate);
const Dispositivo = mongoose.model('dispositivos', DispositivoSchema, 'celularesNuevos');

module.exports = Dispositivo;
