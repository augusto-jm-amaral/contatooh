var passport = require('passport')
, GitHubStrategy = require('passport-github').Strategy
, mongoose = require('mongoose');
;

module.exports = function  () {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
      clientID:'6c763fccb2dbf16e6e63',
      clientSecret:'015b45831d2855276539d35114615a387d2b8784',
      callbackUrl:'http://localhost:3000'

    }, function  (acessToken, refreshToken, profile, done) {

      Usuario.findOrCreate(
        { "login": profile.username},
        { "nome": profile.username},
        function  (err, usuario) {
          if(err){
            console.error(err);
            return done(err);
          }

          return done(null, usuario);
        });

    }));

    passport.serializeUser(function  (usuario, done) {
      done(null, usuario._id);
    });

    passport.deserializeUser(function  (id, done) {
      Usuario.findById(id).exec()
      .then(function  (usuario) {
        done(null, usuario);
      });
    });
}
