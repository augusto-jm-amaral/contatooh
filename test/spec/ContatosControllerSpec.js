describe('ContatosController', function () {

  var $scope, $httpBackend;

  beforeEach(function () {
      module('contatooh');
      inject(function ($injector, _$httpBackend_) {
        $scope = $injector.get('$rootScope').$new();
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/contatos').respond([{
                                                      _id: 1,
                                                      nome: 'Joao',
                                                      email: 'joao@email.com'
                                                      }]);
      });
  });

  it("Deve prencher $scope.contatos com uma lista de contatos",
  inject( function ($controller) {
    $controller('ContatosController', {"$scope" : $scope});
    $httpBackend.flush();
    expect($scope.contatos[0]._id).toBe(1);
  }));

});
