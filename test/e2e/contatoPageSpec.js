var ContatoPage = new require('./pages/contatoPage');

describe('Cadastro de contato', function () {

  var pagina = new ContatoPage();

  beforeEach(function () {
    pagina.visitar();
  });

  it('Deve cadastrar um novo contato', function () {

    var aleatorio = Math.floor((Math.random() * 1000000) + 1);
    var nome = 'teste' + aleatorio;
    var email = 'email' + aleatorio + '@test.com';
    pagina.digitarNome(nome);
    pagina.digitarEmail(email);
    pagina.selecionarPrimeiraEmergenciaDaLista();
    pagina.salvar();
    expect(pagina.obterMensagem()).toContain('sucesso');
  });
});
