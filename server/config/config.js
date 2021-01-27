//=======================
// Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos.
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://192.168.8.210:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

]// pass: KQKxSfw57r9qxAaU
// mongodb+srv://sa:<password>@scroposclust.pmu5p.mongodb.net/<dbname>?retryWrites=true&w=majority

process.env.URLDB = urlDB;


