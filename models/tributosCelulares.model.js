const mongoose = require('mongoose');

const TributosCelularesSchema = new mongoose.Schema({
    IIBB: { type: Number, required: true },
    IVA: { type: Number, required: true },
    Ganancias: { type: Number, required: true },
    TE: { type: Number, required: true },
    DIE: { type: Number, required: true },
    impuestosInternos: { type: Number, required: true },
    impuestoPAIS: { type: Number, required: true }
}, { collection: 'tributosCelulares' });

const TributosCelulares = mongoose.model('TributosCelulares', TributosCelularesSchema, 'tributosCelulares');

module.exports = TributosCelulares;
