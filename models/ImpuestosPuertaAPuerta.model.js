const mongoose = require('mongoose');

const PuertaAPuertaSchema = new mongoose.Schema({
    cantEnviosGratis: { type: Number, required: true },  // Número de envíos sin impuestos adicionales
    tasaCorreo: { type: Number, required: true },  // Tasa del correo en pesos argentinos
    porcentajeDescontado: { type: Number, required: true },  // Porcentaje de descuento cuando se exceden los envíos
    limiteSinImpuestos: { type: Number, required: true },  // Límite sin impuestos en USD
    pesoMaximo: { type: Number, required: true },  // Peso máximo permitido en kg
    montoMaximoPorEnvio: { type: Number, required: true },  // Monto máximo por envío en USD
    impuestoPAIS: { type: Number, required: true },  // Porcentaje de impuesto país
    iva: { type: Number, required: true },  // Impuesto al valor agregado (IVA)
    impuestoGanancias: { type: Number, required: true } // Impuesto ganancias
});

const PuertaAPuerta = mongoose.model('PuertaAPuerta', PuertaAPuertaSchema, 'puertaAPuerta');

module.exports = PuertaAPuerta;
