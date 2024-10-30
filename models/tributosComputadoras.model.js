const mongoose = require('mongoose');

const TributosComputadorasSchema = new mongoose.Schema({
    IIBB: { type: Number, required: true },
    IVA: { type: Number, required: true },
    IVAAD: { type: Number, required: true },
    Ganancias: { type: Number, required: true },
    TE: { type: Number, required: true },
    DIE: { type: Number, required: true },
    impuestoPAIS: { type: Number, required: true }
}, { collection: 'tributosComputadoras' });

const TributosComputadoras = mongoose.model('TributosComputadoras', TributosComputadorasSchema, 'tributosComputadoras');

module.exports = TributosComputadoras;
