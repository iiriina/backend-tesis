const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    historical_values: [Number],
    historical_dates: [String],
    future_predictions: [Number],
    future_dates: [String]
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = Prediction;
