var mongoose = require('mongoose');
var findOrCreate  = require('mongoose-findorcreate'); //plugin mongoose
module.exports = function  () {
  var schema = mongoose.Schema({
    login: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    nome: {
      type: String,
      required: true,
    },
    inclusao :
    {
      type: Date,
      default: Date.now
    }
  });
  schema.plugin(findOrCreate); // associando plugin ao mongoose
  return mongoose.model('Usuario', schema);
};
