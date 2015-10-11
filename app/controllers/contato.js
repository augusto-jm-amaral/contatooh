var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Contato = app.models.contato;
  var controller = {};

  controller.listaContatos = function (req, res) {
    Contato.find().populate('emergencia').exec()
      .then(function  (contatos) {
        res.json(contatos);
      },
      function  (err) {
        console.error(err);
        res.status(500).json(err);
      });
  };

  controller.obtemContato = function (req, res) {
    var _id = sanitize(req.params.id);

    Contato.findById(_id).exec()
      .then(function  (contato) {
        if(!contato) throw new Error('Contato não encontrado');
        res.json(contato);
      },
      function  (err) {
        console.log(err);
        res.status(404).json(err);
      });
  };

  controller.removeContato = function (req, res) {
    var _id = sanitize(req.params.id);

    Contato.remove({'_id': _id}).exec()
      .then(function  () {
        res.status(204).end();
      },
      function  (err) {
        console.log(err);
        res.status(500);
      });
  };

  controller.salvaContato = function  (req, res) {
    var _id = sanitize(req.body._id);

    //filtro de dados, evita a inserção de dados extras
    var dados = {
      "nome": req.body.nome,
      "email": req.body.email,
      "emergencia": req.body.emergencia || null
    };

    if(_id){
      Contato.findByIdAndUpdate(_id, dados).exec()
        .then(function  (contato) {
          res.json(contato);
        },
        function  (err) {
          console.error(err);
          res.json(err);
        });

    }else{
      Contato.create(req.body)
        .then(function  (contato) {
          res.status(201).json(contato);
        },
        function  (err) {
          console.error(err);
          res.status(500).json(err);
        });
    }
  };

  return controller;
}
