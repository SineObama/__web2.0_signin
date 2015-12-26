module.exports = new createMycrypt();

function createMycrypt() {

  var crypto = require('crypto');
  var key = "asdhjwheru*asd123-123";
  var algorithm = 'aes-256-cbc';
  var inputEncoding = 'utf8';
  var outputEncoding = 'hex';

  this.encrypt = function(text) {
    var cipher = crypto.createCipher(algorithm, key);
    cipher.update(text, inputEncoding, outputEncoding);
    return cipher.final(outputEncoding);
  }

  this.decrypt = function(text) {
    var decipher = crypto.createDecipher(algorithm, key);
    decipher.update(text, outputEncoding, inputEncoding);
    return decipher.final(inputEncoding);
  }

}
