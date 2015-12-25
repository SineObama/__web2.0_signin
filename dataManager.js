var debug = require('debug')('signin:userData');
var validator = require('./public/js/validator.js');

module.exports = new dataManager();

function dataManager() {

  var db;
  var collection;

  require('mongodb').MongoClient.connect('mongodb://localhost:27017/userData').then(function(newdb) {
    debug('database connection succeed.');
    db = newdb;
    collection = db.collection('user');
    showCurrentUsersNumber();
    debug('dataManager initialization finish.');
  }).catch(function(err) {
    console.error('error in database connection: ' + err);
    process.exit(1);
  });

  this.addUser = function(user) {
    return this.checkValidation(user || {}).then(function() {
      collection.insert(user);
      return user;
    });
  }

  this.checkValidation = function(user) {

    return validator.informationChecker(user).then(function() {
      return validator.checkPassword(user.password);
    }).then(function() {
      return validator.checkPasswordConfirm(user.password, user.passwordConfirm);
    }).then(function() {
      return checkExistence('username', '用户名');
    }).then(function() {
      return checkExistence('id', '学号');
    }).then(function() {
      return checkExistence('phone', '电话');
    }).then(function() {
      return checkExistence('mail', '邮箱');
    });

    function checkExistence(varName, chineseName) {
      return new Promise(function(res, rej) {
        collection.findOne({
          varName: user[varName]
        }).then(function(data) {
          if (data)
            rej(chineseName + '已存在');
          res();
        });
      });
    }
  }

  this.userSignin = function(username, password) {
    debug('getUser()', 'try to get username', username, 'with password', password);
    return Promise(function(res, rej) {
      collection.findOne({
        username: username
      }).then(function(user) {
        if (!user)
          rej('用户名不存在')
        if (user.password !== password)
          rej('密码错误');
        res(user);
      })
    });
  }

  function showCurrentUsersNumber() {
    collection.find().toArray().then(function(array) {
      debug('showCurrentUsersNumber()', array.length, ' users exist.');
    });
  }

}


// }).catch(function(err) {
//   console.error('error in dataManager initialization: ' + err);
//   process.exit(1);
// });
