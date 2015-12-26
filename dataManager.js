var debug = require('debug')('signin:dataManager');
var validator = require('./public/js/validator.js');
var fatalError = require('./fatalError.js');
var mycrypt = require('./mycrypt.js');

module.exports = new dataManager();

function dataManager() {

  var manager = this;
  var db;
  var collection;

  require('mongodb').MongoClient.connect('mongodb://localhost:27017/userData').then(function(newdb) {
    debug('database connection succeed.');
    db = newdb;
    collection = db.collection('user');
  }).then(showCurrentUsersNumber).then(function() {
    debug('dataManager initialization finish.');
  }).catch(fatalError);

  manager.addUser = function(user) {
    return manager.checkValidation(user || {}).then(function(validUser) {
      delete validUser.passwordConfirm;
      validUser.password = mycrypt.encrypt(validUser.password);
      collection.insert(validUser);
      return validUser;
    });
  }

  manager.checkValidation = function(user) {

    return validator.information(user || {})
      .then(checkExistenceFunc('username', '用户名'))
      .then(checkExistenceFunc('id', '学号'))
      .then(checkExistenceFunc('phone', '电话'))
      .then(checkExistenceFunc('mail', '邮箱'));

    function checkExistenceFunc(name, chineseName) {
      return function(data) {
        var obj = {};
        obj[name] = data[name];
        return collection.findOne(obj).then(function(foundData) {
          if (foundData)
            return Promise.reject(chineseName + '已存在');
          return Promise.resolve(data)
        });
      }
    }

  }

  manager.userSignin = function(username, password) {
    debug(arguments.callee.name, 'try to get username', username, 'with password', password);
    return collection.findOne({
      username: username
    }).then(function(foundUser) {
      if (!foundUser || mycrypt.decrypt(foundUser.password) !== password)
        return Promise.reject('错误的用户名或者密码');
      return Promise.resolve(foundUser);
    });
  }

  function showCurrentUsersNumber() {
    return collection.find().toArray().then(function showCurrentUsersNumber(array) {
      debug(arguments.callee.name, array.length, 'users exist.');
    });
  }

}
