var MongoClient = require('mongodb').MongoClient;

var contatos = [
  {nome: 'contato1', email: 'contato1@email.com.br'},
  {nome: 'contato2', email: 'contato2@email.com.br'},
  {nome: 'contato3', email: 'contato3@email.com.br'}
];

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh',
  function (err, db) {
    if(err) throw err;

    db.dropDatabase(function (err) {
      if(err) return console.log(err);
      console.log('Banco apagado com sucesso');
      db.collection('contatos').insert(contatos,
      function (err, inserted) {
        if(err) return console.log(err);
        console.log('Banco populado com sucesso');
        process.exit(0);
      })
    })
  })
