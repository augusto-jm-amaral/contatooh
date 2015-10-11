angular.module('contatooh').controller('ContatoController',
  function ($scope, $routeParams, $resource, Contato) {

    $scope.mensagem = {};

    function carregaContato () {

      Contato.get({id: $routeParams.contatoId},
        function  (contato) {
          $scope.contato = contato;
        },
        function  (err) {
          $scope.mensagem = {
            texto: 'Não foi possivel obter o contato'
          }
          console.log(err);
        });
    };

    if($routeParams.contatoId){
      carregaContato();
    }else{
      $scope.contato = new Contato();
    }

    $scope.salva = function () {
      $scope.contato.$save()
        .then(function  () {
          $scope.mensagem = {texto: 'O contato foi salvo com sucesso'};
          $scope.contato = new Contato();
        })
        .catch(function  (err) {
          if(err.data.code == 11000){
            $scope.mensagem = { texto: 'O contato já existe!'};
          }else{
            $scope.mensagem = { texto: 'Não foi possivel salvar o contato'};
          }
          console.log(err);
        });
    }

    Contato.query(function  (contatos) {
      $scope.contatos = contatos;
    });

  });
