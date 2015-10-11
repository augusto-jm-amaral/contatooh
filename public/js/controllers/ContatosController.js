angular.module('contatooh').controller('ContatosController',
function ($scope, $http, $resource, Contato) {

  $scope.contatos = [];
  $scope.total = 0;
  $scope.filtro = '';
  $scope.mensagem = {texto: ''};

  function buscaContatos () {

    Contato.query( function  (retorno) {
         $scope.contatos = retorno;
         $scope.mensagem = {};
      },
      function  (err) {
         console.log('Ocorreu um erro ' + err);
         $scope.mensagem = {
            texto: "Não foi possivel carregar os contatos, tente novamente"
          };
      }
    );

  };

  buscaContatos();

  $scope.remove = function  (contato) {

    Contato.delete({id: contato._id},
      buscaContatos,
      function  (err) {
        console.log('Impossivel remover o usuario ' + err);
        $scope.mensagem = {
          texto: "Não foi possivel deletar o contato, tente novamente"
        };
      }
    );

  };


  // $http({method: 'GET', url: '/contatos'})
  //   .then(function  (retorno) {
  //     $scope.contatos = retorno.data;
  //   })
  //   .catch(function  (err) {
  //     console.log('Ocorreu um erro: ' + err);
  //   });

});
