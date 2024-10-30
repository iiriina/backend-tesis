const axios = require('axios');

exports.getPrediction = async function() {
    try {
        console.log("Fetching all historical and future prediction data");

        // URL de la API Gateway (reemplaza con tu propia URL)
        const url = 'https://7xa8zhphp9.execute-api.us-east-1.amazonaws.com/dev/predictions';

        // Realizar la solicitud GET a la API Gateway sin parámetros de consulta
        const response = await axios.get(url);

        // Verificar la estructura de la respuesta
        let responseBody = response.data;
        console.log('response', response);
        console.log('response.data', response.data);

        // Si el cuerpo de la respuesta contiene un 'body' que es una cadena JSON, deserialízalo
        if (responseBody && responseBody.body) {
            try {
                // Preprocesa el JSON para reemplazar "NaN" con null si es necesario
                const preprocessedBody = responseBody.body.replace(/NaN/g, "null");

                responseBody = JSON.parse(preprocessedBody);
            } catch (e) {
                console.error("Failed to parse JSON response body", e.message);
                throw new Error("Failed to parse JSON response body");
            }
        }

        // Verificar si "historical_values" y "future_predictions" están definidos
        const historicalValues = responseBody.historical_values || [];
        const historicalDates = responseBody.historical_dates || [];
        const futurePredictions = responseBody.future_predictions || [];
        const futureDates = responseBody.future_dates || [];

        // Aquí puedes procesar los datos históricos y de predicciones futuros
        // Para el ejemplo, simplemente lo registraremos en la consola

        console.log("Historical Values:", historicalValues);
        console.log("Historical Dates:", historicalDates);
        console.log("Future Predictions:", futurePredictions);
        console.log("Future Dates:", futureDates);

        // Convertir los datos a instancias del modelo Computadora si aplica
        // const computadoras = computadorasData.map(item => new Computadora(item));
        // return computadoras;

        return {
            historicalValues,
            historicalDates,
            futurePredictions,
            futureDates,
        };
    } catch (e) {
        // Manejo de errores
        console.error("Error in getAllPredictions", e.message);
        throw new Error('Error while retrieving prediction data');
    }
};
