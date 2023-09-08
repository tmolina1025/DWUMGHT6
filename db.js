// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB establecida');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error en la conexión a MongoDB: ${err}`);
});

module.exports = mongoose;
