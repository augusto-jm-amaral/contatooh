var mongoose = require('mongoose');

module.exports = function  (uri) {
  mongoose.connect(uri, {server: {poolSize: 15}});

  mongoose.set('debug', true);

  mongoose.connection.on('connected', function  () {
    console.log('Mongoose | conectado ' + uri);
  });

  mongoose.connection.on('disconnected', function  () {
    console.log('Mongoose | desconectado ' + uri);
  });

  mongoose.connection.on('error', function  (err) {
    console.log('Mongoose | Erro na conexão! ' + err);
  });

  process.on('SIGINT', function  () {
    mongoose.connection.close(function(){
      console.log('Mongoose | Desconectado pelo termino da aplicação');
      process.exit(0);
    });
  });
};
