var express = require('express')
, load = require('express-load')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, session = require('express-session')
, passport = require('passport')
, helmet = require('helmet')
;

module.exports = function(){
  var app = express();

  app.set('port', 3000);
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  app.use(cookieParser());
  app.use(session(
    { secret: 'homem avestruz',
      resave: true,
      saveUninitialized: true
    }
  ));
  app.use(passport.initialize());
  app.use(passport.session());
  // app.disable('x-powered-by');
  app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14'})); // troca o x-powered-by do header para PHP
  //                                                        faz parecer que usamos PHP na aplicação
  app.use(helmet.xframe()); // evita que a aplicação seja referencia pro um frame ou iframe
  app.use(helmet.xssFilter()); // adiciona o header http X-XSS-Protection, este solicita o navegador proteção contra XSS
  app.use(helmet.nosniff()); // não permite que o browser infira mime type

  app.use(express.static('./public'));

  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

  app.get('*', function  (req, res) {
    res.status(404).render('404');
  });

  return app;
}
