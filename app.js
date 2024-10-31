var express = require('express');
var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');


// incorporo cors
var cors = require('cors');

// importo router
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api'); // Custom

// instancio el servidor
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// aplico cors
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://main.d12b6ub82hfsfv.amplifyapp.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Indico las rutas de los endpoint
app.use('/api', apiRouter);
app.use('/', indexRouter);

// Verificación del entorno y configuración adicional
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

// Conexión a la base de datos
var mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD", url);
let opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true
};

mongoose.connect(url, opts)
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
      console.log(e)
  })

// Configuración del puerto del servidor
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port, () => {
  console.log('Servidor de ABM Users iniciado en el puerto ', port);
});

module.exports = app;
