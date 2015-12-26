var debug = require('debug')('signin:dataManager');
var validator = require('./public/js/validator.js');
var fatalError = require('./fatalError.js');

module.exports = new dataManager();

function dataManager() {

  var manager = this;
  var db;
  var collection;
  var mycrypt = new createMycrypt();

  require('mongodb').MongoClient.connect('mongodb://localhost:27017/userData').then(function(newdb) {
    debug('database connection succeed.');
    db = newdb;
    collection = db.collection('user');
  }).then(showCurrentUsersNumber).then(function() {
    debug('dataManager initialization finish.');
  }).catch(fatalError);

  manager.addUser = function(user) {
    return manager.checkValidation(user || {}).then(function(user) {
      delete user.passwordConfirm;
      user.password = mycrypt.encrypt(user.password);
      collection.insert(user);
      return user;
    });
  }

  manager.checkValidation = function(user) {

    return validator.information(user).then(validator.password).then(validator.passwordConfirm).then(function() {
      return checkExistence('username', '用户名');
    }).then(function() {
      return checkExistence('id', '学号');
    }).then(function() {
      return checkExistence('phone', '电话');
    }).then(function() {
      return checkExistence('mail', '邮箱');
    });

    function checkExistence(varName, chineseName) {
      var obj = {};
      obj[varName] = user[varName];
      return collection.findOne(obj).then(function(user) {
        return user ? Promise.reject(chineseName + '已存在') : Promise.resolve();
      });
    }

  }

  manager.userSignin = function(username, password) {
    debug('getUser()', 'try to get username', username, 'with password', password);
    return collection.findOne({
      username: username
    }).then(function(user) {
      if (!user || mycrypt.decrypt(user.password) !== password)
        return Promise.reject('错误的用户名或者密码');
      return Promise.resolve(user);
    });
  }

  function showCurrentUsersNumber() {
    return collection.find().toArray().then(function(array) {
      debug('showCurrentUsersNumber()', array.length, ' users exist.');
    });
  }

}

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
